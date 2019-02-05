import { Store } from 'svelte/store.js'
import { group } from 'd3-array'
import { scaleLinear } from 'd3-scale'

const store = new Store({
  // elapsed: 870,
  elapsed: 1300,
  stations: [],
  legs: [],
  trips: [],
  activeTrips: [],

  showLabels: false,
  distort: true,

  increment: 1,

  HEIGHT: 2000,

  innerHeight,
  innerWidth,
  xDomain: [],
  yDomain: [],
  
  selectedStations: ['zl'],
})

const W_H_RATIO = 1.1415702116442234 // arbitrary, no projection, checked with an image in Affinity Photo

store.compute(
  'WIDTH',
  ['HEIGHT'],
  HEIGHT => HEIGHT / W_H_RATIO
)

store.compute(
  'x',
  ['xDomain', 'WIDTH'],
  (xDomain, WIDTH) => scaleLinear()
    .domain(xDomain)
    .range([100, WIDTH - 100])
)

store.compute(
  'y',
  ['yDomain', 'HEIGHT'],
  (yDomain, HEIGHT) => scaleLinear()
    .domain(yDomain)
    .range([HEIGHT - 100, 100])
)

store.on('state', ({ changed, current, previous }) => {
  if (changed.elapsed) {
    current.trips.forEach(trip => {
      if (trip.depart < trip.arrive) {
        trip.active = trip.depart <= current.elapsed && current.elapsed <= trip.arrive
      } else {
        trip.active = trip.depart <= current.elapsed || current.elapsed <= trip.arrive
      }
    })

    current.legs.forEach(leg => {
      leg.from.v.mix(leg.from.o, 0.0025)

      if (leg.active && current.distort) {
        leg.from.v.mix(leg.to.v, Math.log(1.01 + 0.001 * leg.trips.reduce((acc, cur) => acc + (leg.dist / cur.duration), 0)))
      }

      leg.path = undefined
    })

    let activeTrips = current.activeTrips
    
    if (previous && Math.floor(previous.elapsed) !== Math.floor(current.elapsed)) {
      activeTrips = current.activeTrips
        .reduce((acc, cur, i) => {
          if (i < 240) {
            acc.unshift(cur)
          }

          return acc
        }, [current.trips.filter(d => d.active).length])
        .reverse()
    }
    

    store.set({
      trips: current.trips,
      legs: current.legs,
      activeTrips
    })
  }
})

export default store