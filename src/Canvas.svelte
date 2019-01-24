<canvas style="width: 100%; height: 100%;" {width} {height} ref:canvas></canvas>

<script>
  import { forceSimulation } from 'd3-force'

  const setupCanvas = canvas => {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
  
    const ctx = canvas.getContext('2d');

    ctx.scale(dpr, dpr);
    return ctx;
  }

  export default {
    oncreate() {
      const ctx = setupCanvas(this.refs.canvas)
      console.log(this.get(), this.store.get())
      console.log(this.store.get().activeTrips.map(d => d.leg.dist / d.duration))

      this.store.on('state', ({ changed, current, previous}) => {
        if (changed.elapsed) {
          const { legs, activeLegs, stations } = this.store.get()

          const dpr = window.devicePixelRatio || 1;
          const rect = this.refs.canvas.getBoundingClientRect()

          ctx.clearRect(0, 0, rect.width * dpr, rect.height * dpr)
          ctx.save()

          legs.forEach(leg => leg.from.v.mix(leg.from.o, 0.0015))
          activeLegs.forEach(activeLeg => activeLeg.leg.from.v.mix(activeLeg.leg.to.v, Math.log(1 + 0.015 * activeLeg.trips.reduce((acc, cur) => acc + (activeLeg.leg.dist / cur.duration), 0))))
          // console.log(activeLegs[0].trips.reduce((acc, cur) => { acc + activeLegs[0].leg.dist / cur.duration}, 0))
          // console.log(Math.log(1 + activeLegs[0].trips.reduce((acc, cur) => acc + (activeLegs[0].leg.dist / cur.duration), 0)))
          ctx.lineWidth = 1
          ctx.strokeStyle = '#333'
          
          /* globalCompositeOperation :
            normal | multiply | screen | overlay | 
            darken | lighten | color-dodge | color-burn | hard-light | 
            soft-light | difference | exclusion | hue | saturation | 
            color | luminosity
          */
          // ctx.globalCompositeOperation = 'multiply';
          

          legs.forEach(leg => {
            ctx.strokeStyle = '#333'
            ctx.setLineDash([])
            ctx.beginPath()
            ctx.moveTo(leg.from.v.x, leg.from.v.y)
            ctx.lineTo(leg.to.v.x, leg.to.v.y)
            ctx.stroke()
            ctx.closePath()
            
            // ctx.setLineDash([1, 1.5])
          })


          // legs.forEach(leg => {
          //   const p = new Path2D(leg.createPathString())
          //   ctx.setLineDash([])
          //   ctx.stroke(p)
            
          //   // ctx.setLineDash([1, 1.5])
          //   // ctx.stroke(p)
          // })
          
          // ctx.lineWidth = 1
          // ctx.strokeStyle = '#777'

          // activeLegs.forEach(leg => {
          //   // ctx.strokeStyle = `hsla(${0 + leg.leg.from.v.distance(leg.leg.to.v) * 0.6}, 100%, ${30 + leg.leg.from.v.distance(leg.leg.to.v) * 0.3}%, 1)`
          //   ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)'
          //   const p = new Path2D(leg.leg.createPathString())
          //   ctx.setLineDash([])
          //   ctx.stroke(p)

          //   // ctx.beginPath()
          //   // ctx.moveTo(leg.leg.from.v.x, leg.leg.from.v.y)
          //   // ctx.lineTo(leg.leg.to.v.x, leg.leg.to.v.y)
          //   // ctx.stroke()
          //   // ctx.closePath()

          //   // ctx.setLineDash([1, 1.5])
          //   // ctx.stroke(p)
          // })

          ctx.fillStyle = '#fff'
          ctx.strokeStyle = '#000'
          ctx.lineWidth = 1
          // console.log(stations[338].v.clone().subtract(stations[338].o).angleDeg(stations[338].v))
          stations.forEach(station => {
            station.drawOffsetPosition(ctx, station)
            station.drawOffsetLine(ctx, station)
            station.drawLabel(ctx, station)
          })

          ctx.restore()
        }
      })
    },
    data: () => ({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }
</script>