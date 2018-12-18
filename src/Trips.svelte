<g>
  {#each activeTrips as trip}
    <circle
      r="3"
      cx={x(trip.leg.from.lon)}
      cy={y(trip.leg.from.lat)}
      style="fill: steelblue;"
    />
  {/each}
</g>

<script>
  import { select } from 'd3-selection'

  export default {
    namespace: 'svg',
    computed: {
      activeTrips: ({ trips, x, y, elapsed }) => trips.filter(d => elapsed >= d.depart && d.arrive >= elapsed)
    }
  }
</script>
