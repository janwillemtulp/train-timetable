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
      // console.log(this.store.get().activeTrips.map(d => d.leg.dist / d.duration))

      this.store.on('state', ({ changed, current, previous}) => {
        if (changed.elapsed) {
          const { legs, activeLegs, stations } = this.store.get()

          const dpr = window.devicePixelRatio || 1;
          const rect = this.refs.canvas.getBoundingClientRect()

          ctx.clearRect(0, 0, rect.width * dpr, rect.height * dpr)
          ctx.save()
          
          /* globalCompositeOperation :
            normal | multiply | screen | overlay | 
            darken | lighten | color-dodge | color-burn | hard-light | 
            soft-light | difference | exclusion | hue | saturation | 
            color | luminosity
          */
          // ctx.globalCompositeOperation = 'multiply';
          
          legs.forEach(leg => {
            // leg.drawStraight(ctx)
            leg.drawCurved(ctx)
          })

          ctx.fillStyle = '#fff'
          ctx.strokeStyle = '#000'
          ctx.lineWidth = 1
          // console.log(stations[338].v.clone().subtract(stations[338].o).angleDeg(stations[338].v))
          stations.forEach(station => {
            station.drawOffsetPosition(ctx, station)
            // station.drawOffsetLine(ctx, station)
            // station.drawLabel(ctx, station)
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