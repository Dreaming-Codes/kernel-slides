<script lang="ts" setup>
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/blood.css';

import {onMounted} from "vue";
import Reveal, {PluginFunction} from "reveal.js";

const props = defineProps<{
  plugins?: PluginFunction[]
}>()

onMounted(() => {
  Reveal.initialize({
    plugins: props.plugins,
    hash: true,
  }).then()
})

//Reload instead of hot reload since reveal.js doesn't play well with hot reload
import.meta.hot.on("vite:beforeUpdate", ()=>{
  location.reload();
})
</script>

<template>
  <div class="reveal">
    <slot/>
  </div>
</template>

<style>
#app {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>