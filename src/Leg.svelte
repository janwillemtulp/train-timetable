<path
  d={d}
  style="fill: none; stroke: steelblue;"
/>

<script>
  import { line, curveCardinal } from 'd3-shape'

  export default {
    namespace: 'svg',
    computed: {
      d: ({ leg, x, y }) => line()
        .x(d => x(d[0]))
        .y(d => y(d[1]))
        .curve(curveCardinal)([
          [leg.from.lon, leg.from.lat],
          [(leg.from.lon + leg.to.lon) / 2, 0.004 + (leg.from.lat + leg.to.lat) / 2],
          [leg.to.lon, leg.to.lat]
        ])
    }
  }
</script>