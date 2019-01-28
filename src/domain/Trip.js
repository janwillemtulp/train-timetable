const MINUTES_IN_ONE_DAY = 1440

export default class Trip {
  constructor(d, leg) {
    this.depart = +d.depart % MINUTES_IN_ONE_DAY
    this.arrive = +d.arrive % MINUTES_IN_ONE_DAY
    this.trainId = +d['train-id']
    this.legIndex = +d['leg-index']
    this.tripId = +d['trip-id']
    this.active = false
    this.leg = leg
  }

  get duration() {
    if (this.arrive < this.depart) {
      return (this.arrive + 1440) - this.depart
    }
    return this.arrive - this.depart
  }

  isActive(elapsed) {
    if (this.depart < this.arrive) {
      return this.depart <= elapsed && elapsed <= this.arrive
    }

    return this.depart <= elapsed || elapsed <= this.arrive
  }

  get series() {
    return Math.round(this.trainId / 100) * 100
  }
}