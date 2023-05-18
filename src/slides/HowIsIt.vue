<template>
  <section>
    <section>
      <h1 style="font-size: 40px">Ecco come appare il nostro kernel quando lo avviamo...</h1>
      <img style="margin: 0" alt="Schermo nero" src="@/assets/qemu-empty.png">
      <h1 style="font-size: 40px">Impressionante, vero?</h1>
    </section>
    <section>
          <pre data-id="code"><code data-line-numbers data-noescape data-trim style="overflow-y: hidden">
              #![no_std]
              #![no_main]
              use core::panic::PanicInfo;

              #[no_mangle]
              pub extern "C" fn _start() -> ! {
                  loop {}
              }

              #[panic_handler]
              fn panic(_info: &PanicInfo) -> ! {
                  loop {}
              }
          </code></pre>
    </section>
  </section>
</template>