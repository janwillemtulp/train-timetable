<g>
  <text x="200" y="200" style="fill: white;">{leg.depart}</text>
  <!-- <line
    x1={x(leg.from.lon)}
    y1={y(leg.from.lat)}
    x2={x(leg.to.lon)}
    y2={y(leg.to.lat)}
    style="stroke: #777;"
  /> -->
  <!-- <line
    x1={x(leg.from.lon)}
    y1={y(leg.from.lat)}
    x2={x(leg.to.lon)}
    y2={y(leg.to.lat)}
    style="stroke: steelblue; stroke-dasharray: 1 2; stroke-width: 5;"
  />
  <line
    x1={x(leg.from.lon)}
    y1={y(leg.from.lat)}
    x2={x(leg.to.lon)}
    y2={y(leg.to.lat)}
    style="stroke: steelblue; stroke-width: 1.5;"
  /> -->
  <path
    d={d}
    style="fill: none; stroke: {$elapsed >= leg.depart && leg.arrive >= $elapsed ? 'orange' : '#333'}; stroke-width: 0.7;"
    on:mouseover="console.log(leg)"
  />
  <!-- <path
    d={d}
    style="fill: none; stroke: #333; stroke-dasharray: 1 1.5; stroke-width: 2;"
  /> -->
</g>

<script>
  import { line, curveCardinal } from 'd3-shape'

  const dist = (x0, y0, x1, y1) => Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2))

  export default {
    namespace: 'svg',
    computed: {
      d: ({ leg, x, y, active }) => {
        const x0 = x(leg.from.lon)
        const y0 = y(leg.from.lat)

        const x1 = x(leg.to.lon)
        const y1 = y(leg.to.lat)

        const angle = (Math.PI * 0.5) + Math.atan2(leg.to.lat - leg.from.lat, leg.to.lon - leg.from.lon)
        const dst = dist(x(leg.from.lon), y(leg.from.lat), x(leg.to.lon), y(leg.to.lat))

        const cx = x(((leg.from.lon + leg.to.lon) / 2) + Math.cos(angle) * dst * 0.0001)
        const cy = y(((leg.from.lat + leg.to.lat) / 2) + Math.sin(angle) * dst * 0.0001)

        return `M${x0} ${y0} Q ${cx} ${cy} ${x1} ${y1}`
      },
      // d2: ({ leg, x, y }) => line()
      //   .x(d => x(d[0]))
      //   .y(d => y(d[1]))
      //   .curve(curveCardinal.tension(0))([
      //     [leg.from.lon, leg.from.lat],
      //     // [(leg.from.lon + leg.to.lon) / 2, (leg.from.lat + leg.to.lat) / 2],
      //     [
      //       ((leg.from.lon + leg.to.lon) / 2) + Math.cos((Math.PI * 0.5) + Math.atan2(leg.to.lat - leg.from.lat, leg.to.lon - leg.from.lon)) * dist(x(leg.from.lon), y(leg.from.lat), x(leg.to.lon), y(leg.to.lat)) * 0.00005,
      //       ((leg.from.lat + leg.to.lat) / 2) + Math.sin((Math.PI * 0.5) + Math.atan2(leg.to.lat - leg.from.lat, leg.to.lon - leg.from.lon)) * dist(x(leg.from.lon), y(leg.from.lat), x(leg.to.lon), y(leg.to.lat)) * 0.00005
      //     ],
      //     [leg.to.lon, leg.to.lat]
      //   ])
    }
  }
</script>