import Victor from 'victor'

export default class Station {
  constructor(d, x, y) {
    this.fullName = d['full-name']
    this.shortName = d['short-name']
    this.type = d['type']
    this.x = x(+d.lon)
    this.y = y(+d.lat)
    this.o = new Victor(x(+d.lon), y(+d.lat))
    this.v = new Victor(x(+d.lon), y(+d.lat))
  }

  drawLabel(ctx) {
    if (['megastation', 'knooppuntIntercitystation'].includes(this.type)) {
      ctx.fillStyle = '#fff'
      ctx.textAlign = 'center'
      ctx.fillText(this.fullName, this.v.x, this.v.y - 10)
    }
  }

  drawOffsetPosition(ctx) {
    ctx.fillStyle = 'rgba(255, 255, 255, 1)'
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 1

    ctx.beginPath()
    ctx.ellipse(
      this.v.x,
      this.v.y,
      this.type.toLowerCase().indexOf('megastation') > -1 ? 3 : this.type.toLowerCase().indexOf('knooppunt') > -1 ? 2 : 1,
      this.type.toLowerCase().indexOf('megastation') > -1 ? 3 : this.type.toLowerCase().indexOf('knooppunt') > -1 ? 2 : 1,
      0,
      0,
      Math.PI * 2
    )
    // ctx.stroke()
    ctx.fill()
    ctx.closePath()
  }

  drawOffsetLine(ctx) {
    // ctx.strokeStyle = `hsla(0, 100%, ${20 + this.o.distance(this.v)}%, 1)`
    // ctx.strokeStyle = 'rgba(255, 255, 255, 1)'
    // ctx.setLineDash([1, 1.5])
    ctx.strokeStyle = `hsla(${this.v.clone().subtract(this.o).angleDeg(this.v)}, 50%, 50%, 1)`
    // ctx.setLineDash([])

    ctx.beginPath() // does not go right yet. stations are not updated
    ctx.moveTo(this.o.x, this.o.y)
    ctx.lineTo(this.v.x, this.v.y)
    ctx.closePath()
    ctx.stroke()
  }

  drawOriginalPosition(ctx) {
    ctx.fillStyle = '#fff'
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 1

    ctx.beginPath()
    ctx.ellipse(
      this.o.x,
      this.o.y,
      // 1,
      // 1,
      this.type.toLowerCase().indexOf('megastation') > -1 ? 3 : this.type.toLowerCase().indexOf('knooppunt') > -1 ? 2 : 1,
      this.type.toLowerCase().indexOf('megastation') > -1 ? 3 : this.type.toLowerCase().indexOf('knooppunt') > -1 ? 2 : 1,
      0,
      0,
      Math.PI * 2
    )
    ctx.stroke()
    ctx.fill()
    ctx.closePath()
  }
}