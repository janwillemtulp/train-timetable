<g>
  {#each legs as leg, i}
    <Leg {leg} {x} {y} active={$elapsed >= leg.depart && leg.arrive >= $elapsed} />
  {/each}
</g>

<script>
  import { line } from 'd3-shape'

  export default {
    namespace: 'svg',
    data: () => ({
      elapsed: 899
    }),
    computed: {
      filteredLegs: ({ legs, trips, elapsed }) => trips
        .filter(d => elapsed >= d.depart && d.arrive >= elapsed)
        .map(d => d.leg)
		},
    components: {
      Leg: './Leg.svelte'
    }
  }
</script>