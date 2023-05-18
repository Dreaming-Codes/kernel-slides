<script setup>
import MorOsFeaturesGridInteractive from "@/slides/MorOs/features/MorOsFeaturesGridInteractive.vue";
import LibRs from "@/slides/MorOs/code/LibRs.vue";
</script>

<template>
  <section>
    <section>
      <h1>MOROS</h1>
      <img alt="screenshot di MorOs" src="@/assets/moros.png">
    </section>
    <MorOsFeaturesGridInteractive/>
    <section>
      <h1>How?</h1>
      <lib-rs data-line-numbers="0,0|19-38|20|21|22|23|24|25|26|28-30|31|32|33|34|35|36|37" />
    </section>
  </section>
</template>
