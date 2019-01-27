<div style="position: relative;">
	{#await promise}
		<p style="color: white;">loading...</p>
	{:then}
		<!-- <svg {width} {height} ref:svg>
			<text x="200" y="200" style="fill: white;">{Math.round(Math.floor($elapsed / 60))}:{Math.round($elapsed % 60) < 10 ? '0' : ''}{Math.round($elapsed % 60)}</text>
			<Legs {width} {height} x={data.x} y={data.y} elapsed={$elapsed} />
			<Stations stations={data.stations} {width} {height} x={data.x} y={data.y} /> -->
			<!-- <Trips trips={data.trips} {width} {height} x={data.x} y={data.y} elapsed={$elapsed} /> -->
		<!-- </svg> -->
		<Canvas />
	{/await}
	<div style="position: absolute; top: 20px; left: 20px">
		<button on:click="toggleLabels()">toggle labels</button>
		<button on:click="toggleDistort()">toggle distortion</button>
		<input type="range" min="0.05" max="2" value="1" step="0.01" on:input="updateIncrement(this.value)" />
	</div>
</div>

<style>
	h1 {
		color: purple;
	}
</style>

<script>
	import { csv } from 'd3-fetch'
	import { extent } from 'd3-array'
	import { scaleLinear } from 'd3-scale'
	import store from './store.js'
	import { select, mouse} from 'd3-selection'
	import Victor from 'victor'
	import Station from './domain/Station'
	import Leg from './domain/Leg'
	import Trip from './domain/Trip'

	const dist = (from, to) => Math.sqrt(Math.pow(to[0] - from[0], 2) + Math.pow(to[1] - from[1], 2))

	const pathString = (from, to) => {
		const angle = (Math.PI * 0.5) + Math.atan2(to[1] - from[1], to[0] - from[0])
		const dst = dist(from, to)

		const cx = ((from[0] + to[0]) / 2) + (Math.cos(angle) * dst * 0.15)
		const cy = ((from[1] + to[1]) / 2) + (Math.sin(angle) * dst * 0.15)

		return `M${from[0]} ${from[1]} Q ${cx} ${cy} ${to[0]} ${to[1]}`
	}

	export default {
		store: () => store,
		oncreate() {
			// from: https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
			var stop = false;
			var frameCount = 0;
			var fps, fpsInterval, startTime, now, then, elapsed;

			function startAnimating(fps) {
					fpsInterval = 1000 / fps
					then = Date.now()
					startTime = then
					animate()
			}

			function animate() {
				requestAnimationFrame(animate)

				now = Date.now()
				elapsed = now - then

				if (elapsed > fpsInterval) {
						then = now - (elapsed % fpsInterval)

						store.set({ elapsed: (store.get().elapsed + store.get().increment) % 1440 })

				}
			}

			startAnimating(60)
		},
		data: () => ({
			width: window.innerHeight,
			height: window.innerHeight,
			promise: Promise.all([
				'./data/stations.csv',
				'./data/legs.csv',
				'./data/data.csv'
			].map(d => csv(d)))
				.then(results => {
					const x = scaleLinear()
						.domain(extent(results[0], d => +d.lon))
						.range([100, window.innerHeight - 100])

					const y = scaleLinear()
						.domain(extent(results[0], d => +d.lat))
						.range([window.innerHeight - 10, 10])

					const stations = results[0]
						.filter(d => !d['full-name'].toLowerCase().includes('grens'))
						.map(d => new Station(d, x, y))

					console.log([...new Set(stations.map(d => d.type))])

					const legs = results[1].map(d => {
						const from = stations.find(s => s.shortName === d.from)
						const to = stations.find(s => s.shortName === d.to)

						return new Leg(d, from, to, store)
					})

					const trips = []
					results[2].forEach(d => {
						const leg = legs[+d['leg-index']]
						const trip = new Trip(d)
						
						leg.trips.push(trip)
						trips.push(trip)
					})
				
					console.log(stations, legs, trips)

					store.set({
						stations,
						legs,
						trips,
						x,
						y
					})

					console.log('STORE', store.get())

					return
			})
		}),
		methods: {
			toggleLabels() {
				this.store.set({
					showLabels: !this.store.get().showLabels
				})
			},
			toggleDistort() {
				this.store.set({
					distort: !this.store.get().distort
				})
			},
			updateIncrement(value) {
				this.store.set({ increment: +value })
			}
		},
		components: {
			Canvas: './Canvas.svelte'
		}
	}
</script>