<svelte:window bind:innerWidth=$innerWidth bind:innerHeight=$innerHeight on:resize="resize()" />
<header>
	<h1>On Time Every Time</h1>
</header>
<main>
	<div style="position: relative;" class="grid-item">
		{#await $trains}
		<p style="color: white; position: absolute; top: 50%; left: 50%; font-size: 50px;">loading...</p>
		{:then}
		<!-- <svg {width} {height} ref:svg>
				<text x="200" y="200" style="fill: white;">{Math.round(Math.floor($elapsed / 60))}:{Math.round($elapsed % 60) < 10 ? '0' : ''}{Math.round($elapsed % 60)}</text>
				<Legs {width} {height} x={data.x} y={data.y} elapsed={$elapsed} />
				<Stations stations={data.stations} {width} {height} x={data.x} y={data.y} /> -->
		<!-- <Trips trips={data.trips} {width} {height} x={data.x} y={data.y} elapsed={$elapsed} /> -->
		<!-- </svg> -->

		<Canvas />
		{/await}
		<div style="position: relative; bottom: 18%; left: 20px">
			<Switch on:switch="toggleLabels()" label="labels" />
			<Switch on:switch="toggleDistortion()" label="distortion" checked={true} />
			<!-- <button on:click="toggleLabels()">toggle labels</button> -->
			<!-- <button on:click="toggleDistort()">toggle distortion</button> -->
			<Range on:input="updateIncrement(event.value)" label="speed" />
		</div>
	</div>
	<div class="grid-item">
		<p>When a train starts running from one station to the next station, conceptually, these two stations will temporarily be closer to each other. And that is exactly what this visualization shows: whenever a train moves to the next station — and only for as long as a train is moving — the origin station moves towards the destination station. The faster the train, the closer it moves to its destination. And also, the more trains run from the origin to a destination, the more it moves towards its destination. When no train is moving from a certain station to a destination, that station will slowly move back to its original geographical location.	</p>
		<p>My hypothesis was that the west of The Netherlands, the area between Amsterdam, The Hague, Rotterdam and Utrecht is very well connected, and so the geography of the should distort very much in this area. But many stations have different destinations, so over time stations can be 'pulled' towards different destinations. And during night time, when almost no trains are running, almost all the stations will move back to their original geographical location.</p>
		<p>This visualization shows the train schedule in The Netherlands for 1 of the busiest days that have been scheduled: December 14, 2018 (it is not based on realtime data).</p>
		<p>During the process several beautiful images were generated, such as the following:</p>
		{#each range(7) as i}
			<img src="img/process-{i}.png" alt="process-image" style="width: 100%;" />
		{/each}
		<p>Data source: <a href="https://ndovloket.nl/" target="_blank">NDOV Loket</a>, one of the #opendata sources in The Netherlands.</p>
		<p>Credits: <a href="http://tulpinteractive.com" target="_blank" style="color: white;"><img src="img/logo.png" alt="TULP interactive" width="13" style="margin-right: 4px;" />TULP interactive</p>
	</div>
</main>

<style>
	main {
	  display: grid;
	  width: 100%;
	}

	.grid-item {
		max-width: 1140px;
		justify-self: center;
		width: 100%;
	}

	h1 {
		font-family: 'Maven Pro', sans-serif;
		font-weight: bold;
	  width: 100%;
	  text-align: center;
	  color: white;
		text-transform: uppercase;
		letter-spacing: 0.3rem;
		font-size: 1.8rem;
		margin: 0;
		padding: 2rem;
		background-color: #001f38;
		border-bottom: 1px solid #284258;
	}
</style>

<script>
	import { csv } from "d3-fetch"
	import { extent, range } from "d3-array"
	import { scaleLinear } from "d3-scale"
	import store from "./store.js"
	import { select, mouse } from "d3-selection"
	import Victor from "victor"
	import Station from "./domain/Station"
	import Leg from "./domain/Leg"
	import Trip from "./domain/Trip"

	export default {
		store: () => store,
		helpers: {
			range
		},
	  oncreate() {
	    // from: https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
			Promise.all(
				['./data/stations.csv', './data/legs.csv', './data/data.csv'	]
					.map(d => csv(d))
	    ).then(results => {
				store.set({
					innerWidth: window.innerWidth,
					innerHeight: window.innerHeight,
					xDomain: extent(results[0], d => +d.lon),
					yDomain: extent(results[0], d => +d.lat)
				})

				const { x, y } = store.get()
				console.log(x.domain(), x.range(), y.domain(), y.range())

	      const stations = results[0]
	        .filter(d => !d["full-name"].toLowerCase().includes("grens"))
	        .map(d => new Station(d, x, y))

	      const legs = results[1].map(d => {
	        const from = stations.find(s => s.shortName === d.from)
	        const to = stations.find(s => s.shortName === d.to)

	        return new Leg(d, from, to)
	      })

	      const trips = []
	      results[2].forEach(d => {
	        const leg = legs[+d["leg-index"]]
	        const trip = new Trip(d, leg)

	        leg.trips.push(trip)
	        trips.push(trip)
	      });

	      console.log(stations, legs, trips)

	      store.set({
	        stations,
	        legs,
	        trips,
	      })

	      console.log("STORE", store.get())
			})
			
			var stop = false;
	    var frameCount = 0;
	    var fps, fpsInterval, startTime, now, then, elapsed;

	    function startAnimating(fps) {
	      fpsInterval = 1000 / fps;
	      then = Date.now();
	      startTime = then;
	      animate();
	    }

	    function animate() {
	      requestAnimationFrame(animate);

	      frameCount++;

	      now = Date.now();
	      elapsed = now - then;
	      // if (Math.floor(frameCount % 10 === 0)) { console.log(Math.round(elapsed))}
	      if (elapsed > fpsInterval) {
	        then = now - (elapsed % fpsInterval);

	        store.set({
	          elapsed: (store.get().elapsed + store.get().increment) % 1440
	        });
	      }
	    }

	    startAnimating(60);
	  },
	  methods: {
	    toggleLabels() {
	      this.store.set({
	        showLabels: !this.store.get().showLabels
	      });
	    },
	    toggleDistortion() {
	      this.store.set({
	        distort: !this.store.get().distort
	      });
	    },
	    updateIncrement(value) {
	      this.store.set({ increment: +value })
			},
			resize() {
				this.store.set({
					innerWidth: window.innerWidth,
					innerHeight: window.innerHeight
				})
			}
	  },
	  components: {
			Canvas: './Canvas.svelte',
			Switch: './Switch.svelte',
			Range: './Range.svelte'
	  }
	};
</script>