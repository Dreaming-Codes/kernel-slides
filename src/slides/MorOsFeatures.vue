<template>
  <section data-auto-animate>
    <h1 data-id="title" style="font-size: 100px">Features</h1>
    <div class="row">
      <div class="column">
        <img alt="MorOs shell" src="@/assets/moros-shell.png">
        <img alt="MorOs find" src="@/assets/moros-find.png">
      </div>
      <div class="column">
        <img alt="MorOs text editor" src="@/assets/moros-text-editor.png">
        <img alt="MorOs calculator" src="@/assets/moros-network.png">
      </div>
    </div>
  </section>
</template>

<style scoped lang="postcss">
.row {
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
}

.column {
  flex: 25%;
  max-width: 50%;
  padding: 0 4px;
}

.column img {
  margin-top: 8px;
  vertical-align: middle;
}
</style>