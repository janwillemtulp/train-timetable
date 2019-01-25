import { Store } from 'svelte/store.js'
import { group } from 'd3-array'

const store = new Store({
  // elapsed: 870,
  elapsed: 1300,
  stations: [],
  legs: [],
  trips: [],

  showLabels: true,
  distort: true,

  increment: 1, 
  
  selectedStations: ['zl'],
  x: undefined,
  y: undefined,
})

export default store