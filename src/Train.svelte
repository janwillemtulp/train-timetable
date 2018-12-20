<g>
  <line
    x1={front.x}
    y1={front.y}
    x2={back.x}
    y2={back.y}
    style="stroke: white; stroke-width: 2;"
  />
  <!-- <line
    x1={front2.x}
    y1={front2.y}
    x2={back2.x}
    y2={back2.y}
    style="stroke: white; stroke-width: 2;"
  /> -->
  <!-- <text
    x={front.x}
    y={front.y}
    dy="-3"
    style="fill: white; font-size: 8px; text-anchor: middle;"
  >{leg.trip.leg.to['full-name']}</text> -->
  <!-- <text
    x={front.x}
    y={front.y}
    dy="7"
    style="fill: white; font-size: 8px; text-anchor: middle;"
  >{leg.trip['trip-id']}</text> -->
</g>

<script>
  import { line, curveCardinal } from 'd3-shape'
  import { select } from 'd3-selection'

  const dist = (x0, y0, x1, y1) => Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2))

  export default {
    namespace: 'svg',
    computed: {
      front: ({ leg, elapsed }) => {
        const path = select(`#leg-${leg.ix}`).node()

        if (path && leg.trip) {
          return path.getPointAtLength(((elapsed - leg.trip.depart + 1) / (leg.trip.arrive - leg.trip.depart)) * path.getTotalLength())
        } else {
          return 0
        }
      },
      back: ({ leg, elapsed }) => {
        const path = select(`#leg-${leg.ix}`).node()

        if (path && leg.trip) {
          return path.getPointAtLength(((elapsed - leg.trip.depart + 1) / (leg.trip.arrive - leg.trip.depart)) * path.getTotalLength() - 10)
        } else {
          return 0
        }
      },
      // front2: ({ leg, elapsed }) => {
      //   const path = select(`#leg-${leg.ix}`).node()

      //   if (path && leg.trip) {
      //     return path.getPointAtLength(((elapsed - leg.trip.depart + 1) / (leg.trip.arrive - leg.trip.depart)) * path.getTotalLength() - 12)
      //   } else {
      //     return 0
      //   }
      // },
      // back2: ({ leg, elapsed }) => {
      //   const path = select(`#leg-${leg.ix}`).node()

      //   if (path && leg.trip) {
      //     return path.getPointAtLength(((elapsed - leg.trip.depart + 1) / (leg.trip.arrive - leg.trip.depart)) * path.getTotalLength() - 22)
      //   } else {
      //     return 0
      //   }
      // }
    }
  }
</script>