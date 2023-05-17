<script lang="ts" setup>
import RevealContainer from "@/components/RevealContainer.vue";
import Highlight from "reveal.js/plugin/highlight/highlight";
import "reveal.js/plugin/highlight/monokai.css";
import Notes from "reveal.js/plugin/notes/notes";
import RevealSearch from "reveal.js/plugin/search/search";
import RevealZoom from "reveal.js/plugin/zoom/zoom";
import Slides from "@/components/Slides.vue";
import Slide from "@/components/Slide.vue";
</script>

<template>
  <RevealContainer :plugins="[Highlight, Notes, RevealSearch, RevealZoom]">
    <Slides>
      <Slide>Slide 1</Slide>
      <Slide>
        <pre>
          <code data-noescape data-trim>
            (def lazy-fib
              (concat
               [0 1]
               ((fn rfib [a b]
                    (lazy-cons (+ a b) (rfib b (+ a b)))) 0 1)))
          </code>
        </pre>
      </Slide>
    </Slides>
  </RevealContainer>
</template>