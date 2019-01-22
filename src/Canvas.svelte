<canvas style="width: 100%; height: 100%;" {width} {height} ref:canvas></canvas>

<script>
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
      const { stations, x, y } = this.get().data
      
      // ctx.lineWidth = 1
      // ctx.strokeStyle = '#333'

      // this.store.get().legs.forEach(leg => {
      //   const p = new Path2D(leg.pathString)
      //   ctx.setLineDash([])
      //   ctx.stroke(p)
        
      //   ctx.setLineDash([1, 1.5])
      //   ctx.stroke(p)
      // })

      // ctx.lineWidth = 2
      // ctx.strokeStyle = '#ff0'

      // ctx.fillStyle = '#fff'
      // ctx.strokeStyle = '#000'
      // ctx.lineWidth = 2

      // stations.forEach(station => {
      //   ctx.beginPath()
      //   ctx.ellipse(
      //     x(station.lon),
      //     y(station.lat),
      //     station.type.toLowerCase().indexOf('megastation') > -1 ? 3 : station.type.toLowerCase().indexOf('knooppunt') > -1 ? 2 : 1,
      //     station.type.toLowerCase().indexOf('megastation') > -1 ? 3 : station.type.toLowerCase().indexOf('knooppunt') > -1 ? 2 : 1,
      //     0,
      //     0,
      //     Math.PI * 2
      //   )
      //   ctx.stroke()
      //   ctx.fill()
      //   ctx.closePath()
      // })

      this.store.on('state', ({ changed, current, previous}) => {
        if (changed.elapsed) {
          const dpr = window.devicePixelRatio || 1;
          const rect = this.refs.canvas.getBoundingClientRect()

          ctx.clearRect(0, 0, rect.width * dpr, rect.height * dpr)

          ctx.lineWidth = 1
          ctx.strokeStyle = '#333'

          this.store.get().legs.forEach(leg => {
            const p = new Path2D(leg.pathString)
            ctx.setLineDash([])
            ctx.stroke(p)
            
            ctx.setLineDash([1, 1.5])
            ctx.stroke(p)
          })
          
          ctx.lineWidth = 2
          ctx.strokeStyle = '#ff0'

          this.store.get().activeLegs.forEach(leg => {
            const p = new Path2D(leg.leg.pathString)
            ctx.setLineDash([])
            ctx.stroke(p)

            ctx.setLineDash([1, 1.5])
            ctx.stroke(p)
          })
        }
      })
    },
    data: () => ({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }
</script>