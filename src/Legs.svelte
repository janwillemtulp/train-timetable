<g>
  {#each legs as leg, i}
    <Leg {leg} {x} {y} active={false} elapsed={$elapsed} />
  {/each}
  {#each $filteredLegs as leg, i}
    <Leg {leg} {x} {y} active={true} elapsed={$elapsed} />
  {/each}
  {#each $filteredLegs as leg, i}
    <Train {leg} elapsed={$elapsed} />
  {/each}
</g>

<script>
  import { line } from 'd3-shape'

  export default {
    namespace: 'svg',
    components: {
      Leg: './Leg.svelte',
      Train: './Train.svelte'
    }
  }
</script>