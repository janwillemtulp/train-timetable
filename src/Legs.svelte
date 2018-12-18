<g>
  {#each legs as leg, i}
    <Leg {leg} {x} {y} active={false} elapsed={$elapsed} />
  {/each}
  {#each filteredLegs as leg, i}
    <Leg {leg} {x} {y} active={true} elapsed={$elapsed} />
  {/each}
</g>

<script>
  import { line } from 'd3-shape'

  export default {
    namespace: 'svg',
    // data: () => ({
    //   elapsed: 899
    // }),
    computed: {
      filteredLegs: ({ legs, trips, elapsed }) => {
        return trips
          .filter(d => elapsed >= d.depart && d.arrive >= elapsed)
          .map(d => ({
            ...d.leg,
            trip: d
          }))
		}},
    components: {
      Leg: './Leg.svelte'
    }
  }
</script>