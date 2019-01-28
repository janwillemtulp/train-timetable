import { Store } from 'svelte/store.js'
import { group } from 'd3-array'

const store = new Store({
  // elapsed: 870,
  elapsed: 1300,
  stations: [],
  legs: [],
  trips: [],

  showLabels: false,
  distort: true,

  increment: 1, 
  
  selectedStations: ['zl'],
  x: undefined,
  y: undefined,
})

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

    store.set({
      trips: current.trips,
      legs: current.legs
    })
  }
})

export default store