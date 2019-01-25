import { Store } from 'svelte/store.js'
import { group } from 'd3-array'

const store = new Store({
  elapsed: 870,
  stations: [],
  legs: [],
  trips: [],
  
  selectedStations: [],
  x: undefined,
  y: undefined,
})

// store.compute(
//   'activeLegs',
//   ['trips'],
//   trips => trips.filter(d => d.active)
// )

export default store