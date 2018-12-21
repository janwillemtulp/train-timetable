import { Store } from 'svelte/store.js'

const store = new Store({
  elapsed: 370,
  stations: [],
  legs: [],
  trips: [],
  selectedStations: ['dt']
})

store.compute(
  'selectedStationTrips',
  ['trips', 'selectedStations'],
  (trips, selectedStations) => trips
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
  'activeLegIndices',
  ['filteredTrips', 'elapsed'],
  (filteredTrips, elapsed) => filteredTrips
    .filter(d => d.depart <= elapsed && elapsed <= d.arrive)
    .map(d => d.leg.ix)
)

// // let a = new Set([1,2,3]);
// // let b = new Set([4,3,2]);
// // let intersection = new Set(
// //     [...a].filter(x => b.has(x)));
// //     // {2,3}

// store.compute(
//   'filteredTrips',
//   ['trips', 'filteredTrains'],
//   (trips, filteredTrains) => [...new Set(trips.filter(d => filteredTrains.includes(trip['train-id'])))]
// )

// store.compute(
//   'filteredLegs',
//   ['filteredTrips'],
//   (filteredTrips) => filteredTrips.map(d => d.leg)
// )

// store.compute(
//   'filteredLegIndices',
//   ['filteredLegs'],
//   filteredLegs => filteredLegs.map(d => d.ix)
// )

// store.compute(
//   'activeTrips',
//   ['filteredTrips', 'elapsed'],
//   (filteredTrips, elapsed) => filteredTrips.filter(d => d.depart <= elapsed && d.arrive >= elapsed)
// )

// store.compute(
//   'activeLegIndices',
//   ['activeTrips'],
//   activeTrips => activeTrips.map(d => d.leg.ix)
// )

export default store

// store.compute(
//   'filteredLegs',
//   ['legs', 'trips', 'elapsed'],
//   (legs, trips, elapsed) => trips
//     .filter(d => elapsed >= d.depart && d.arrive >= elapsed)
//     .map(d => ({
//       ...d.leg,
//       trip: d
//     }))
// )

// store.compute(
//   'filteredTrains', // activeTrains
//   ['trips', 'selectedStations'],
//   (trips, selectedStations) =>  [
//     ...new Set(trips
//       .filter(d => 
//         selectedStations.includes(d.leg.from['short-name'])
//         || selectedStations.includes(d.leg.to['short-name']))
//       .map(d => d['train-id']))
//   ]
// )