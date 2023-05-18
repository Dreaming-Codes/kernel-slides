<script lang="ts" setup>
import RevealContainer from "@/components/RevealContainer.vue";
import Highlight from "reveal.js/plugin/highlight/highlight";
import "reveal.js/plugin/highlight/monokai.css";
import Notes from "reveal.js/plugin/notes/notes";
import RevealSearch from "reveal.js/plugin/search/search";
import RevealZoom from "reveal.js/plugin/zoom/zoom";
import Slides from "@/components/Slides.vue";
import Introduction from "@/slides/Introduction.vue";
import STDProblem from "@/slides/STDProblem.vue";
import HowIsIt from "@/slides/HowIsIt.vue";
import NowPrintSomethingProblem from "@/slides/NowPrintSomethingProblem.vue";
import NowPrintSomethingSolution from "@/slides/NowPrintSomethingSolution.vue";
import MorOs from "@/slides/MorOs/MorOs.vue";
import NowWhatIsMissing from "@/slides/NowWhatIsMissing.vue";
</script>

<template>
  <RevealContainer :plugins="[Highlight, Notes, RevealSearch, RevealZoom]" navigation-mode="linear">
    <Slides>
      <Introduction/>
      <STDProblem/>
      <HowIsIt/>
      <NowPrintSomethingProblem/>
      <NowPrintSomethingSolution/>
      <NowWhatIsMissing/>
      <MorOs/>
    </Slides>
  </RevealContainer>
</template>