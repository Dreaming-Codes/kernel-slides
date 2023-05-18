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
</script>

<template>
  <RevealContainer :plugins="[Highlight, Notes, RevealSearch, RevealZoom]" navigation-mode="linear">
    <Slides>
      <Introduction/>
      <STDProblem/>
      <HowIsIt/>
      <NowPrintSomethingProblem/>
      <NowPrintSomethingSolution/>
      <section>
        <section data-auto-animate>
          <h1 data-id="now?" style="font-size: 110px">E ora?</h1>
        </section>
        <section data-auto-animate>
          <h1 data-id="now?" style="font-size: 70px">Ora dobbiamo implementare:</h1>
          <ul>
            <li>Un modo per gestire le eccezioni della CPU</li>
            <li class="fragment">Un modo per gestire gli interrupt, e di conseguenza i vari driver per le periferiche</li>
            <li class="fragment">Un modo per gestire la memoria e isolare ogni processo: Paging</li>
            <li class="fragment">Una implementazione di Thread per gestire più task e isolare i processi</li>
            <li class="fragment">Un modo per fare comunicare l'user-space con il kernel (syscall)</li>
            <li class="fragment">Molto altro ancora...</li>
          </ul>
        </section>
      </section>
      <section>
        <h1>MOROS</h1>
        <img alt="screenshot di MorOs" src="@/assets/moros.png">
      </section>
    </Slides>
  </RevealContainer>
</template>