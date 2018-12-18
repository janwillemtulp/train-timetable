<g>
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
    style="fill: none; stroke: #333; stroke-width: 0.5;"
  />
  <path
    d={d}
    style="fill: none; stroke: #333; stroke-dasharray: 1 1.5; stroke-width: 1;"
  />
</g>

<script>
  import { line, curveCatmullRom } from 'd3-shape'

  const dist = (x0, y0, x1, y1) => Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2))

  export default {
    namespace: 'svg',
    computed: {
      d: ({ leg, x, y }) => line()
        .x(d => x(d[0]))
        .y(d => y(d[1]))
        .curve(curveCatmullRom)([
          [leg.from.lon, leg.from.lat],
          // [(leg.from.lon + leg.to.lon) / 2, (leg.from.lat + leg.to.lat) / 2],
          [
            ((leg.from.lon + leg.to.lon) / 2) + Math.cos((Math.PI * 0.5) + Math.atan2(leg.to.lat - leg.from.lat, leg.to.lon - leg.from.lon)) * dist(x(leg.from.lon), y(leg.from.lat), x(leg.to.lon), y(leg.to.lat)) * 0.00005,
            ((leg.from.lat + leg.to.lat) / 2) + Math.sin((Math.PI * 0.5) + Math.atan2(leg.to.lat - leg.from.lat, leg.to.lon - leg.from.lon)) * dist(x(leg.from.lon), y(leg.from.lat), x(leg.to.lon), y(leg.to.lat)) * 0.00005
          ],
          [leg.to.lon, leg.to.lat]
        ])
    }
  }
</script>