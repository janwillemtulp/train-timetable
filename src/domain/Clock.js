import { range, mean } from 'd3-array'

export default class Clock {
  constructor(store) {
    this.store = store
    this.center = [220, 300]
  }

  draw(ctx) {
    const HALF_PI = Math.PI / 2
    const R = 60

    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(`${ Math.floor(this.hours) }: ${ this.minutes < 10 ? '0' : '' }${ Math.floor(this.minutes) }`, this.center[0], this.center[1] + 30)
    
    ctx.strokeStyle = 'rgba(51, 121, 204, 0.3)'
    ctx.fillStyle = 'rgba(51, 121, 204, 0.1)'

    ctx.lineWidth = 3

    ctx.beginPath()
    ctx.moveTo(this.center[0], this.center[1])
    ctx.lineTo(
      this.center[0] + Math.cos(-HALF_PI + (this.minutes % 60 / 60) * Math.PI * 2) * R,
      this.center[1] + Math.sin(-HALF_PI + (this.minutes % 60 / 60) * Math.PI * 2) * R)
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.moveTo(this.center[0], this.center[1])
    ctx.lineTo(
      this.center[0] + Math.cos(-HALF_PI + (this.hours % 12 / 12) * Math.PI * 2) * R * 0.66,
      this.center[1] + Math.sin(-HALF_PI + (this.hours % 12 / 12) * Math.PI * 2) * R * 0.66)
    ctx.stroke()
    ctx.closePath()

    for (let i = 0; i < 60; i++) {
      ctx.lineWidth = i % 5 === 0 ? 4 : 1
      ctx.strokeStyle = i % 60 === Math.floor(this.minutes) ? 'orange' : 'rgba(51, 121, 204, 0.3)'
      ctx.beginPath()
      ctx.moveTo(
        this.center[0] + Math.cos(-HALF_PI + (i / 60) * Math.PI * 2) * (R),
        this.center[1] + Math.sin(-HALF_PI + (i / 60) * Math.PI * 2) * (R)
      )
      ctx.lineTo(
        this.center[0] + Math.cos(-HALF_PI + (i / 60) * Math.PI * 2) * (R + (i % 5 === 0 ? 12 : 7)),
        this.center[1] + Math.sin(-HALF_PI + (i / 60) * Math.PI * 2) * (R + (i % 5 === 0 ? 12 : 7))
      )
      ctx.stroke()
      ctx.closePath()

      if (i % 5 === 0) {
        ctx.fillStyle = Math.floor(this.hours) === 1 + (i / 5) ? 'orange' : 'rgba(51, 121, 204, 0.6)'
        ctx.font = 'bold 14px Arial'
        ctx.fillText(
          1 + (i / 5),
          this.center[0] + Math.cos((Math.PI * 2 / 12) - HALF_PI + (i / 60) * Math.PI * 2) * (R + 30),
          this.center[1] + Math.sin((Math.PI * 2 / 12) - HALF_PI + (i / 60) * Math.PI * 2) * (R + 30) - 6,
        )

        ctx.fillStyle = Math.floor(this.hours) === 13 + (i / 5) || (Math.floor(this.hours) === 0 && 13 + (i / 5) === 24) ? 'orange' : 'rgba(51, 121, 204, 0.6)'
        ctx.font = 'normal 10px Arial'
        ctx.fillText(
          13 + (i / 5),
          this.center[0] + Math.cos((Math.PI * 2 / 12) - HALF_PI + (i / 60) * Math.PI * 2) * (R + 30),
          this.center[1] + Math.sin((Math.PI * 2 / 12) - HALF_PI + (i / 60) * Math.PI * 2) * (R + 30) + 6,
        )
      }
    }
  }

  drawTrainCount(ctx, activeTrips) {
    const HALF_PI = Math.PI / 2
    const R = 115
    ctx.fillStyle = 'rgba(51, 121, 204, 0.3)'

    const dataAngle = (Math.PI * 2) / 1
    const startAngle = ((this.hours % 12 / 12) * Math.PI * 2) - dataAngle

    activeTrips.forEach((trip, i) => {
      if (i === 0) {
        ctx.strokeStyle = 'orange'
      } else {
        ctx.strokeStyle = `rgba(51, 121, 204, ${1 - (i / activeTrips.length)})`
        // ctx.strokeStyle = `hsl(216, 67%, ${51 - (i / activeTrips.length * 51)}%)`
      }
      ctx.beginPath()
      ctx.moveTo(
        this.center[0] + Math.cos(-HALF_PI + startAngle + (((activeTrips.length - i) / (activeTrips.length - 1)) * dataAngle)) * R,
        this.center[1] + Math.sin(-HALF_PI + startAngle + (((activeTrips.length - i) / (activeTrips.length - 1)) * dataAngle)) * R
      )
      ctx.lineTo(
        this.center[0] + Math.cos(-HALF_PI + startAngle + (((activeTrips.length - i) / (activeTrips.length - 1)) * dataAngle)) * (R + (trip * 0.3)),
        this.center[1] + Math.sin(-HALF_PI + startAngle + (((activeTrips.length - i) / (activeTrips.length - 1)) * dataAngle)) * (R + (trip * 0.3))
      )
      ctx.closePath()
      ctx.stroke()
    })

    ctx.beginPath()
    ctx.ellipse(
      this.center[0],
      this.center[1],
      R, R,
      0, 0,
      Math.PI * 2
    )
    ctx.closePath()
    ctx.fillStyle = 'black'
    ctx.fill()

    range(3).forEach(i => {
      ctx.beginPath()
      ctx.ellipse(
        this.center[0],
        this.center[1],
        R + 0.3 * (i + 1) * 100, R + 0.3 * (i + 1) * 100,
        0, 0,
        Math.PI * 2
      )
      ctx.closePath()
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
      ctx.fill()
    })

    ctx.fillStyle = 'orange'
    ctx.textAlign = 'center'
    ctx.font = 'normal 14px sans-serif'
    ctx.fillText(
      activeTrips[0] + ' trains',
      this.center[0] + Math.cos(-HALF_PI + startAngle + 0.035 * dataAngle) * (R + mean(activeTrips.slice(0, 10)) * 0.3),
      this.center[1] + Math.sin(-HALF_PI + startAngle + 0.035 * dataAngle) * (R + mean(activeTrips.slice(0, 10)) * 0.3)
    )
  }

  get hours() {
    return this.store.get().elapsed / 60
  }

  get minutes() {
    return this.store.get().elapsed % 60
  }
}