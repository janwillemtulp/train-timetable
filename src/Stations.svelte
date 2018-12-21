<g>
  {#each stations as station}
    <circle
      r="2"
      cx={x(station.lon)}
      cy={y(station.lat)}
      style="fill: white; stroke: black; stroke-width: 2;"
      on:mouseover="console.log(station)"
      on:click="setSelectedStation(station)"
    />
    <!-- <text
      x={x(station.lon)}
      y={y(station.lat)}
      dy="-5"
      style="font-size: 8px; text-anchor: middle; fill: black; stroke: black; stroke-width: 1;"
    >{station['full-name']}</text>
    <text
      x={x(station.lon)}
      y={y(station.lat)}
      dy="-5"
      style="font-size: 8px; text-anchor: middle; fill: white;"
    >{station['full-name']}</text> -->
  {/each}
</g>

<script>
  

  export default {
    namespace: 'svg',
    methods: {
      setSelectedStation(station) {
        this.store.set({ selectedStations: [station['short-name']] })
      }
    }
  }
</script>