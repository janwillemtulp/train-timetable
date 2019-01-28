<canvas style="width: 100%; height: 100%;" {width} {height} ref:canvas></canvas>

<script>
  import { forceSimulation } from 'd3-force'
  import Clock from './domain/Clock'

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
      
      const clock = new Clock(this.store)

      this.store.on('state', ({ changed, current, previous}) => {
        if (changed.elapsed) {
          const { legs, stations, elapsed } = this.store.get()

          const dpr = window.devicePixelRatio || 1;
          const rect = this.refs.canvas.getBoundingClientRect()

          ctx.clearRect(0, 0, rect.width * dpr, rect.height * dpr)
          ctx.save()

          clock.draw(ctx)
            
          legs.forEach(leg => {
            // leg.drawStraight(ctx)
            leg.drawCurved(ctx)
            leg.drawTrains(ctx, elapsed)
          })

          stations.forEach(station => {
            station.drawOffsetPosition(ctx)
            // station.drawOffsetLine(ctx)
            if (this.store.get().showLabels) {
              station.drawLabel(ctx)
            }
            // station.drawOriginalPosition(ctx)
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