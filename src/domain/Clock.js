export default class Clock {
  constructor(store) {
    this.store = store
  }

  draw(ctx) {
    const HALF_PI = Math.PI / 2
    const R = 60

    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(`${ Math.floor(this.hours) }: ${ this.minutes < 10 ? '0' : '' }${ Math.floor(this.minutes) }`, 200, 330)
    
    ctx.strokeStyle = 'rgba(51, 121, 204, 0.3)'
    ctx.fillStyle = 'rgba(51, 121, 204, 0.1)'
    ctx.beginPath()
    ctx.ellipse(
      200,
      300,
      R + 50,
      R + 50,
      0,
      0,
      Math.PI * 2
    )
    ctx.closePath()
    ctx.stroke()
    ctx.fill()

    ctx.lineWidth = 3

    ctx.beginPath()
    ctx.moveTo(200, 300)
    ctx.lineTo(
      200 + Math.cos(-HALF_PI + (this.minutes % 60 / 60) * Math.PI * 2) * R,
      300 + Math.sin(-HALF_PI + (this.minutes % 60 / 60) * Math.PI * 2) * R)
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.moveTo(200, 300)
    ctx.lineTo(
      200 + Math.cos(-HALF_PI + (this.hours % 12 / 12) * Math.PI * 2) * R * 0.66,
      300 + Math.sin(-HALF_PI + (this.hours % 12 / 12) * Math.PI * 2) * R * 0.66)
    ctx.stroke()
    ctx.closePath()

    for (let i = 0; i < 60; i++) {
      ctx.lineWidth = i % 5 === 0 ? 4 : 1
      ctx.strokeStyle = i % 60 === Math.floor(this.minutes) ? 'orange' : 'rgba(51, 121, 204, 0.3)'
      ctx.beginPath()
      ctx.moveTo(
        200 + Math.cos(-HALF_PI + (i / 60) * Math.PI * 2) * (R),
        300 + Math.sin(-HALF_PI + (i / 60) * Math.PI * 2) * (R)
      )
      ctx.lineTo(
        200 + Math.cos(-HALF_PI + (i / 60) * Math.PI * 2) * (R + (i % 5 === 0 ? 12 : 7)),
        300 + Math.sin(-HALF_PI + (i / 60) * Math.PI * 2) * (R + (i % 5 === 0 ? 12 : 7))
      )
      ctx.stroke()
      ctx.closePath()

      if (i % 5 === 0) {
        ctx.fillStyle = Math.floor(this.hours) === 1 + (i / 5) ? 'orange' : 'rgba(51, 121, 204, 0.6)'
        ctx.font = 'bold 14px Arial'
        ctx.fillText(
          1 + (i / 5),
          200 + Math.cos((Math.PI * 2 / 12) - HALF_PI + (i / 60) * Math.PI * 2) * (R + 30),
          300 + Math.sin((Math.PI * 2 / 12) - HALF_PI + (i / 60) * Math.PI * 2) * (R + 30) - 6,
        )

        ctx.fillStyle = Math.floor(this.hours) === 13 + (i / 5) || (Math.floor(this.hours) === 0 && 13 + (i / 5) === 24) ? 'orange' : 'rgba(51, 121, 204, 0.6)'
        ctx.font = 'normal 10px Arial'
        ctx.fillText(
          13 + (i / 5),
          200 + Math.cos((Math.PI * 2 / 12) - HALF_PI + (i / 60) * Math.PI * 2) * (R + 30),
          300 + Math.sin((Math.PI * 2 / 12) - HALF_PI + (i / 60) * Math.PI * 2) * (R + 30) + 6,
        )
      }
    }
  }

  get hours() {
    return this.store.get().elapsed / 60
  }

  get minutes() {
    return this.store.get().elapsed % 60
  }
}