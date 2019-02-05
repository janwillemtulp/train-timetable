<svelte:window on:resize="resize()" />
<canvas style="width: 100%; height: 100%;" height={$HEIGHT} width=$WIDTH ref:canvas></canvas>

<script>
  import Clock from './domain/Clock'

  // const setupCanvas = (canvas, store) => {
  const setupCanvas = (canvas, store) => {
    const dpr = window.devicePixelRatio || 1
    // const rect = canvas.getBoundingClientRect()

    const { WIDTH, HEIGHT } = store.get()

    // canvas.width = rect.width * dpr
    // canvas.height = rect.height * dpr
    canvas.height = HEIGHT * dpr
    canvas.width = WIDTH * dpr

    const ctx = canvas.getContext('2d', { alpha: true }) // TODO: false should be faster?

    ctx.scale(dpr, dpr)
    
    return ctx
  }

  export default {
    oncreate() {
      const ctx = setupCanvas(this.refs.canvas, this.store)
      
      const clock = new Clock(this.store)

      this.store.on('state', ({ changed, current, previous}) => {
        
        if (changed.elapsed) {
          const { legs, stations, elapsed, activeTrips, WIDTH, HEIGHT } = this.store.get()

          const dpr = window.devicePixelRatio || 1;
          // const rect = this.refs.canvas.getBoundingClientRect()

          ctx.clearRect(0, 0, WIDTH * dpr, HEIGHT * dpr)
          // ctx.clearRect(0, 0, rect.width * dpr, rect.height * dpr)
          ctx.save()
            
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

          clock.drawTrainCount(ctx, activeTrips)
          clock.draw(ctx)

          ctx.restore()
        }
      })
    },
    methods: {
      resize() {
        // const dpr = window.devicePixelRatio || 1
        // const rect = this.refs.canvas.getBoundingClientRect()

        // this.refs.canvas.width = this.store.get().innerHeight * dpr
        // this.refs.canvas.height = this.store.get().innerHeight * dpr
        // this.refs.canvas.width = rect.width * dpr
        // this.refs.canvas.height = rect.height * dpr

      }
    }
  }
</script>