<g>
  <path
    d={leg.pathString}
    style="fill: none; stroke: #333; stroke-width: 0.5;"
  />
  <path
    d={leg.pathString}
    style="fill: none; stroke: #333; stroke-dasharray: 1 1.5; stroke-width: 2;"
  />
</g>

<script>
  // const dist = (x0, y0, x1, y1) => Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2))

  export default {
    namespace: 'svg',
    // onstate({ changed, current, previous}) {
    //   // console.log(this.store.get().filteredTrains)
    // },
    // computed: {
    //   d: ({ leg, x, y }) => {
    //     const x0 = x(leg.from.lon)
    //     const y0 = y(leg.from.lat)

    //     const x1 = x(leg.to.lon)
    //     const y1 = y(leg.to.lat)

    //     const angle = (Math.PI * -0.5) + Math.atan2(leg.to.lat - leg.from.lat, leg.to.lon - leg.from.lon)
    //     const dst = dist(x(leg.from.lon), y(leg.from.lat), x(leg.to.lon), y(leg.to.lat))

    //     const cx = x(((leg.from.lon + leg.to.lon) / 2) + Math.cos(angle) * dst * 0.0001)
    //     const cy = y(((leg.from.lat + leg.to.lat) / 2) + Math.sin(angle) * dst * 0.0001)

    //     return `M${x0} ${y0} Q ${cx} ${cy} ${x1} ${y1}`
    //   }
    // }
  }
</script>