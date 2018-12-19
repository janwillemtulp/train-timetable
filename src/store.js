import { Store } from 'svelte/store.js'

const store = new Store({
  elapsed: 370,
  stations: [],
  legs: [],
  trips: [],
  selectedStations: []
})

store.compute(
  'filteredLegs',
  ['legs', 'trips', 'elapsed'],
  (legs, trips, elapsed) => trips
    .filter(d => elapsed >= d.depart && d.arrive >= elapsed)
    .map(d => ({
      ...d.leg,
      trip: d
    }))
)

export default store