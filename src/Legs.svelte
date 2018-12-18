<g>
  {#each legs as leg, i}
    <!-- <line
      x1={x(leg.from.lon)}
      y1={y(leg.from.lat)}
      x2={x(leg.to.lon)}
      y2={y(leg.to.lat)}
      style="stroke: red;"
    /> -->
    <!-- {#if i < 100} -->
      <Leg {leg} {x} {y} />
    <!-- {/if} -->
  {/each}
</g>

<script>
  import { line } from 'd3-shape'

  export default {
    namespace: 'svg',
    components: {
      Leg: './Leg.svelte'
    }
  }
</script>