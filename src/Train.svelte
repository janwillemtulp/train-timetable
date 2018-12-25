<g>
  <!-- <text x="200" y="200" style="fill: white;">{path}</text> -->
  <line
    x1={front.x}
    y1={front.y}
    x2={back.x}
    y2={back.y}
    style="stroke: yellow; stroke-width: 3; stroke-dasharray: 5 1"
  />
  <!-- <text
    x={front.x}
    y={front.y}
    style="font-size: 8px; fill: white; text-anchor: middle ;"
  >{trip.leg.to['full-name']}</text> -->
</g>

<script>
  import { select } from 'd3-selection'

  const dist = (x0, y0, x1, y1) => Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2))

  export default {
    namespace: 'svg',
    computed: {
      front: ({ trip, path, elapsed }) => {
        // const path = select(`#leg-${trip.leg.ix}`).node()

        if (path && trip) {
          return path.getPointAtLength(((elapsed - trip.depart + 1) / (trip.arrive - trip.depart)) * path.getTotalLength())
        } else {
          return 0
        }
      },
      back: ({ trip, path, elapsed }) => {
        // const path = select(`#leg-${trip.leg.ix}`).node()

        if (path && trip) {
          return path.getPointAtLength(((elapsed - trip.depart + 1) / (trip.arrive - trip.depart)) * path.getTotalLength() - 10)
        } else {
          return 0
        }
      },
    }
  }
</script>