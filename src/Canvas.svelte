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

          ctx.lineWidth = 1
          ctx.strokeStyle = '#333'

          legs.forEach(leg => {
            const p = new Path2D(leg.createPathString())
            ctx.setLineDash([])
            ctx.stroke(p)
            
            ctx.setLineDash([1, 1.5])
            ctx.stroke(p)
          })
          
          ctx.lineWidth = 1
          ctx.strokeStyle = 'orange'

          activeLegs.forEach(leg => {
            const p = new Path2D(leg.leg.createPathString())
            ctx.setLineDash([])
            ctx.stroke(p)

            ctx.setLineDash([1, 1.5])
            ctx.stroke(p)
          })

          ctx.fillStyle = '#fff'
          ctx.strokeStyle = '#000'
          ctx.lineWidth = 2

          stations.forEach(station => {
            ctx.beginPath()
            ctx.ellipse(
              station.v.x,
              station.v.y,
              station.type.toLowerCase().indexOf('megastation') > -1 ? 3 : station.type.toLowerCase().indexOf('knooppunt') > -1 ? 2 : 1,
              station.type.toLowerCase().indexOf('megastation') > -1 ? 3 : station.type.toLowerCase().indexOf('knooppunt') > -1 ? 2 : 1,
              0,
              0,
              Math.PI * 2
            )
            ctx.stroke()
            ctx.fill()
            ctx.closePath()
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