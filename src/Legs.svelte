<g>
  {#each legs as leg}
    <!-- <line
      x1={x(leg.from.lon)}
      y1={y(leg.from.lat)}
      x2={x(leg.to.lon)}
      y2={y(leg.to.lat)}
      style="stroke: red;"
    /> -->
    <Leg {leg} {x} {y} />
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