<g>
  <!-- {#each $legs as leg, i}
    <Leg {leg} {x} {y} elapsed={$elapsed} active={$activeLegIndices.includes(leg.ix)} />
  {/each} -->
  {#each $legs as leg, i (leg.ix)}
    <Leg {leg} />
  {/each}
  {#each $activeLegs as activeLeg, i}
    <ActiveLeg {activeLeg} active={true} />
  {/each}}
  <!-- {#each $filteredLegs as leg, i}
    <Leg {leg} {x} {y} active={true} />
  {/each}
  {#each $filteredTrips as trip}
    <Train {trip} elapsed={$elapsed} />
  {/each} -->
  <!-- {#each $filteredLegs as leg, i}
    <Train {leg} elapsed={$elapsed} />
  {/each} -->
</g>

<script>
  import { line } from 'd3-shape'

  export default {
    namespace: 'svg',
    components: {
      Leg: './Leg.svelte',
      Train: './Train.svelte',
      ActiveLeg: './ActiveLeg.svelte'
    }
  }
</script>