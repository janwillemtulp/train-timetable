const MINUTES_IN_ONE_DAY = 1440

export default class Trip {
  constructor(d) {
    this.arrive = +d.arrive % MINUTES_IN_ONE_DAY
    this.depart = +d.depart % MINUTES_IN_ONE_DAY
    this.trainId = +d['train-id']
    this.legIndex = +d['leg-index']
    this.tripId = +d['trip-id']
    this.active = false

    //leg: legs.find((l, i) => i === +d['leg-index']),
  }

  get duration() {
    return (this.arrive % MINUTES_IN_ONE_DAY) - (this.depart % MINUTES_IN_ONE_DAY)
  }

  get series() {
    return Math.round(this.trainId / 100) * 100
  }
}