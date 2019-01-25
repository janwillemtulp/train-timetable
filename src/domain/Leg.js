export default class Leg {
  constructor(d, from, to, store) {
    this.tariffUnit =  +d['tarif-unit']
    this.dist = +d.dist
    this.ix = +d.ix
    this.from = from
    this.to = to
    this.angle = Math.atan2(this.to.y - this.from.y, this.to.x - this.from.x)
    this.trips = []
    this.activeTrips = this.trips
    this.path = ''
    this.props = undefined
    this.store = store

    store.on('state', ({ changed, current, previous }) => {
      if (changed.elapsed) {
        this.activeTrips = this.trips
          .filter(d => d.depart <= current.elapsed && current.elapsed <= d.arrive)

        this.from.v.mix(this.from.o, 0.002)

        if (this.active) {
          this.from.v.mix(this.to.v, Math.log(1 + 0.002 * this.trips.reduce((acc, cur) => acc + (this.dist / cur.duration), 0)))
        }

        this.path = this. createPathString()
        this.props = spp.svgPathProperties(this.path)
      }
    })
  }

  get active() {
    return this.activeTrips.length > 0
  }

  createPathString() {
    const angle = (Math.PI * 0.5) + Math.atan2(this.to.v.y - this.from.v.y, this.to.v.x - this.from.v.x)
    const dist = Math.sqrt(Math.pow(this.to.v.x - this.from.v.x, 2) + Math.pow(this.to.v.y - this.from.v.y, 2))

    const cx = ((this.from.v.x + this.to.v.x) / 2) + (Math.cos(angle) * dist * 0.15)
    const cy = ((this.from.v.y + this.to.v.y) / 2) + (Math.sin(angle) * dist * 0.15)

    return `M${this.from.v.x} ${this.from.v.y} Q ${cx} ${cy} ${this.to.v.x} ${this.to.v.y}`
  }

  drawStraight(ctx) {
    const dist = Math.max(this.from.o.distance(this.to.o), this.from.v.distance(this.to.v)) / this.from.o.distance(this.to.o)
    
    ctx.strokeStyle = '#333'
    // ctx.strokeStyle = `hsla(${dist * dist * 0.3}, 100%, ${15 + dist * dist * 0.5}%, 1)`
    // ctx.globalCompositeOperation = 'screen'
    // ctx.strokeStyle = `hsla(${this.from.v.distance(this.to.v)}, 100%, 50%, 1)`
    // ctx.strokeStyle = `hsla(${(270 + this.from.v.distance(this.to.v) / this.from.o.distance(this.to.o) * 10) % 360}, 100%, ${10 + this.from.v.distance(this.to.v) / this.from.o.distance(this.to.o) * 5}%, 0.01)`
    ctx.setLineDash([])
    ctx.beginPath()
    ctx.moveTo(this.from.v.x, this.from.v.y)
    ctx.lineTo(this.to.v.x, this.to.v.y)
    ctx.stroke()
    ctx.closePath()
  }

  drawCurved(ctx) {
    const p = new Path2D(this.path)
    ctx.strokeStyle = 'rgba(51, 121, 204, 0.3)'
    // ctx.strokeStyle = 'rgba(255, 165, 0, 0.3)'
    // ctx.strokeStyle = `hsla(${this.from.v.distance(this.to.v) / this.from.o.distance(this.to.o) * 3}, 100%, ${10 + this.from.v.distance(this.to.v) / this.from.o.distance(this.to.o) * 5}%, 1)`
    // ctx.strokeStyle = this.active ? 'lime' : '#333'
    // ctx.strokeStyle = 'rgba(255, 127, 0, 0.01)'
    // ctx.globalCompositeOperation = 'screen'
    // ctx.strokeStyle = `hsla(${this.from.v.distance(this.to.v)}, 100%, 50%, 1)`
    ctx.setLineDash([])
    ctx.stroke(p)
  }

  drawTrains(ctx) {
    const elapsed = this.store.get().elapsed
    // ctx.strokeStyle = 'orange'
    ctx.strokeStyle = 'rgb(247, 202, 73)'
    ctx.lineWidth = 2
    // ctx.setLineDash([1, 1.5])

    this.activeTrips.forEach(trip => {
      
      const front = this.props.getPointAtLength(((elapsed - trip.depart + 1) / (trip.arrive - trip.depart)) * this.props.getTotalLength())
      const back = this.props.getPointAtLength(((elapsed - trip.depart + 1) / (trip.arrive - trip.depart)) * this.props.getTotalLength() - 7)

      ctx.beginPath()
      ctx.moveTo(front.x, front.y)
      ctx.lineTo(back.x, back.y)
      ctx.closePath()
      ctx.stroke()
    })
  }
}