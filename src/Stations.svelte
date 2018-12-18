<g>
  {#each stations as station}
    <circle
      r="2"
      cx={x(station.lon)}
      cy={y(station.lat)}
      style="fill: black;"
    />
  {/each}
</g>

<script>
  

  export default {
    namespace: 'svg'
  }
</script>