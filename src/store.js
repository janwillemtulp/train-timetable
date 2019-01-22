import { Store } from 'svelte/store.js'
import { group } from 'd3-array'

const store = new Store({
  elapsed: 870,
  stations: [],
  legs: [],
  trips: [],
  selectedStations: []
})

store.compute(
  'selectedStationTrips',
  ['trips', 'selectedStations'],
  (trips, selectedStations) => selectedStations.length === 0 ? trips : trips
    .filter(d => 
      selectedStations.includes(d.leg.from['short-name'])
      || selectedStations.includes(d.leg.to['short-name']))
)

store.compute(
  'filteredTrains',
  ['selectedStationTrips'],
  selectedStationTrips => [...new Set(selectedStationTrips.map(d => d['train-id']))]
)

store.compute(
  'filteredTrips', // trips
  ['trips', 'filteredTrains'],
 (trips, filteredTrains) => [...new Set(trips.filter(d => filteredTrains.includes(d['train-id'])))]
)

store.compute(
  'filteredLegs',
  ['filteredTrips'],
  filteredTrips => filteredTrips.map(d => d.leg)
)

store.compute(
  'activeTrips',
  ['filteredTrips', 'elapsed'],
  (filteredTrips, elapsed) => filteredTrips.filter(d => d.depart <= elapsed && elapsed <= d.arrive)
)

store.compute(
  'activeLegs',
  ['activeTrips', 'elapsed'],
  activeTrips => Array.from(group(activeTrips, d => d.leg.ix).values()).map(d => ({
    leg: d[0].leg,
    trips: d
  }))
)

export default store