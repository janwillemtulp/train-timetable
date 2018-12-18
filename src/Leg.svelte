<g>
  {#if active}
    <!-- <text
      x={x(leg.from.lon)}
      y={y(leg.from.lat)}
      style="fill: white;"
    >{test.x}</text> -->
    <path
      ref:path
      id="leg-{leg.ix}"
      d={d}
      style="fill: none; stroke: orange; stroke-width: 0.7;"
    />
    <circle
      r="3"
      cx={test.x}
      cy={test.y}
      style="fill: white; stroke: orange; stroke-width: 1;"
    />
  {:else}
    <path
      ref:path
      id="leg-{leg.ix}"
      d={d}
      style="fill: none; stroke: #333; stroke-width: 0.7;"
    />
  {/if}
  <!-- <path
    d={d}
    style="fill: none; stroke: #333; stroke-dasharray: 1 1.5; stroke-width: 2;"
  /> -->
</g>

<script>
  import { line, curveCardinal } from 'd3-shape'
  import { select } from 'd3-selection'

  const dist = (x0, y0, x1, y1) => Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2))

  export default {
    namespace: 'svg',
    computed: {
      d: ({ leg, x, y }) => {
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
      test: ({ leg, elapsed }) => {
        const path = select(`#leg-${leg.ix}`).node()

        if (path && leg.trip) {
          return path.getPointAtLength(((elapsed - leg.trip.depart) / (leg.trip.arrive - leg.trip.depart)) * path.getTotalLength())
        } else {
          return 0
        }
      }
    }
  }
</script>