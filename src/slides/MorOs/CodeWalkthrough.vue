<script setup lang="ts">
import LibRs from "@/slides/MorOs/code/LibRs.vue";
import GdtRs from "@/slides/MorOs/code/GdtRs.vue";
import IdtRs from "@/slides/MorOs/code/IdtRs.vue";
import KeyboardRs from "@/slides/MorOs/code/KeyboardRs.vue";
</script>

<template>
  <section data-auto-animate>
    <h1 style="font-size: 100px">How?</h1>
    <lib-rs data-id="codeLeft" data-line-numbers="0,0|19-37|20" />
    <p class="fragment">Qui viene inizializzato un modulo dedito alla gestione del testo sul display</p>
  </section>
  <section data-auto-animate>
    <lib-rs class="base smaller" data-id="codeLeft" data-line-numbers="21" />
  </section>
  <section data-auto-animate>
    <lib-rs class="base smaller" data-id="codeLeft" data-line-numbers="21" />
    <gdt-rs class="base right" data-line-numbers="58-65|37-47"/>
    <p>Qui inizializziamo il Global Descriptor Table</p>
    <aside class="notes">
      Qui si inizializza il Global Descriptor Table una struttura dati necessaria per indicare alla nostra CPU i privilegi necessari per accedere a determinate aree di memoria permettendo di eseguire codice in modalità utente e in modalità kernel (ring 3 e ring 0).
      Anche qui si tratta di inserire dei valori in memoria. In questo caso ci si affida a un crate esterno che si occupa di gestire la GDT senza dover scrivere codice assembly e sapere le regioni di memoria necessarie.
    </aside>
  </section>
  <section data-auto-animate>
    <lib-rs class="base smaller" data-id="codeLeft" data-line-numbers="21|22" />
  </section>
  <section data-auto-animate>
    <lib-rs class="base smaller" data-id="codeLeft" data-line-numbers="22" />
    <idt-rs class="base right" data-line-numbers="16-18|30-67|217-224|70-78"/>
    <p>Qui inizializziamo l'Interrupt Descriptor Table</p>
    <aside class="notes">
      Qui si inizializza l'Interrupt Descriptor Table una struttura dati necessaria per indicare alla nostra CPU i punti di ingresso per le interruzioni hardware e software.
      Anche qui si tratta di inserire dei valori in memoria. In questo caso ci si affida a un crate esterno che si occupa di gestire la IDT senza dover scrivere codice assembly e sapere le regioni di memoria necessarie.
    </aside>
  </section>
  <section data-auto-animate>
    <lib-rs class="base smaller" data-id="codeLeft" data-line-numbers="22|23|24" />
    <p>Qui usiamo il Programmable Interrupt Controller per dire alla nostra cpu di iniziare a gestire le interruzioni</p>
    <aside class="notes">
      Qui si dice al Programmable Interrupt Controller di iniziare a gestire le interruzioni. Qui si tratta semplicemente di cambiare il valore di un registro della CPU
    </aside>
  </section>
  <section data-auto-animate>
    <lib-rs class="base smaller" data-id="codeLeft" data-line-numbers="24" />
    <keyboard-rs class="base right" data-line-numbers="57-60|48-55|59|77-105"/>
    <p>Qui configuriamo la tastiera</p>
  </section>
  <section data-auto-animate>
    <lib-rs class="base smaller" data-id="codeLeft" data-line-numbers="24|25" />
    <p>Qui viene usato il real time clock della scheda madre per ottenere l'orario preciso</p>
  </section>
</template>

<style lang="postcss" scoped>
.base {
  width: 60%;
  display: inline-block;
}
.smaller {
  width: 40%;
}
.right {
  font-size: 11px;
}
</style>