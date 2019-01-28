export default class Leg {
  constructor(d, from, to) {
    this.tariffUnit = +d['tarif-unit']
    this.dist = +d.dist
    this.ix = +d.ix
    this.from = from
    this.to = to
    this.angle = Math.atan2(this.to.y - this.from.y, this.to.x - this.from.x)
    this.trips = []
    this.path = ''
    this.props = undefined
  }

  get active() {
    // return this.activeTrips.length > 0
    return this.trips.filter(d => d.active).length > 0
  }

  createPathString() {
    const angle = (Math.PI * 0.5) + Math.atan2(this.to.v.y - this.from.v.y, this.to.v.x - this.from.v.x)
    const dist = Math.sqrt(Math.pow(this.to.v.x - this.from.v.x, 2) + Math.pow(this.to.v.y - this.from.v.y, 2))

    const cx = ((this.from.v.x + this.to.v.x) / 2) + (Math.cos(angle) * dist * 0.15)
    const cy = ((this.from.v.y + this.to.v.y) / 2) + (Math.sin(angle) * dist * 0.15)

    return `M${this.from.v.x} ${this.from.v.y} Q ${cx} ${cy} ${this.to.v.x} ${this.to.v.y}`
  }

  /* globalCompositeOperation :
          normal | multiply | screen | overlay |
          darken | lighten | color-dodge | color-burn | hard-light |
          soft-light | difference | exclusion | hue | saturation |
          color | luminosity
        */

  drawStraight(ctx) {
    const dist = Math.max(this.from.o.distance(this.to.o), this.from.v.distance(this.to.v)) / this.from.o.distance(this.to.o)

    ctx.strokeStyle = '#333'
    // ctx.strokeStyle = `hsla(${dist * dist * 0.3}, 100%, ${15 + dist * dist * 0.5}%, 1)`
    // ctx.globalCompositeOperation = 'screen'
    // ctx.strokeStyle = `hsla(${this.from.v.distance(this.to.v)}, 100%, 50%, 1)`
    ctx.strokeStyle = `hsla(${180 + (this.from.v.distance(this.to.v) / this.from.o.distance(this.to.o) * 10) % 180}, 100%, 50%, 1)`
    ctx.setLineDash([])
    ctx.beginPath()
    ctx.moveTo(this.from.v.x, this.from.v.y)
    ctx.lineTo(this.to.v.x, this.to.v.y)
    ctx.stroke()
    ctx.closePath()
  }

  drawCurved(ctx) {
    if (!this.path) {
      this.path = this.createPathString()
      this.props = spp.svgPathProperties(this.path)
    }

    const distanceRatio = this.from.v.distanceSq(this.to.v) / this.from.o.distance(this.to.o)
    const p = new Path2D(this.path)

    ctx.lineWidth = this.active ? 2 : 1
    ctx.strokeStyle = this.active ? 'rgba(51, 121, 204, 0.5)' : 'rgba(51, 121, 204, 0.3)'
    // ctx.strokeStyle = 'rgba(255, 165, 0, 0.3)'
    // ctx.strokeStyle = 'rgba(51, 121, 204, 0.3)' // NS blue
    // ctx.strokeStyle = `hsla(200, 100%, ${30 + distanceRatio * 0.1}%, ${this.active ? 0.5 : 0.3})`
    // ctx.strokeStyle = this.active ? 'lime' : '#333'
    // ctx.strokeStyle = 'rgba(255, 127, 0, 0.01)'
    // ctx.globalCompositeOperation = 'screen'
    // ctx.strokeStyle = `hsla(${this.from.v.distance(this.to.v)}, 100%, 50%, 0.3)`
    ctx.setLineDash([])
    ctx.stroke(p)
  }

  drawTrains(ctx, elapsed) {
    ctx.strokeStyle = 'orange'
    // ctx.strokeStyle = 'rgb(247, 202, 73)' // NS yellow
    ctx.lineWidth = 2
    // ctx.setLineDash([1, 1.5])

    // this.activeTrips.forEach(trip => {
    this.trips.filter(d => d.active).forEach(trip => {
      // elapsed will reset to 0 after it reached 1440, so I need to account for situations where
      // departure is after arrive, for instance, departure: 1439, arrive: 8
      const ratio = ((elapsed < trip.depart ? 1440 + elapsed : elapsed) - trip.depart + 1) / trip.duration
      
      const front = this.props.getPointAtLength(ratio * this.props.getTotalLength())
      const back = this.props.getPointAtLength(ratio * this.props.getTotalLength() - 7)

      ctx.beginPath()
      ctx.moveTo(front.x, front.y)
      ctx.lineTo(back.x, back.y)
      ctx.closePath()
      ctx.stroke()

      // ctx.fillStyle = `hsla(${Math.floor(trip.series / 1000) * 20}, 50%, 50%, 1)`
      // ctx.textAlign = 'center'
      // ctx.fillText(trip.series, front.x, front.y - 10)
    })
  }
}