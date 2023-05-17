<script lang="ts" setup>
import RevealContainer from "@/components/RevealContainer.vue";
import Highlight from "reveal.js/plugin/highlight/highlight";
import "reveal.js/plugin/highlight/monokai.css";
import Notes from "reveal.js/plugin/notes/notes";
import RevealSearch from "reveal.js/plugin/search/search";
import RevealZoom from "reveal.js/plugin/zoom/zoom";
import Slides from "@/components/Slides.vue";
</script>

<template>
  <RevealContainer :plugins="[Highlight, Notes, RevealSearch, RevealZoom]" navigation-mode="linear">
    <Slides>
      <section>
        <section data-auto-animate>
          <h1>Creiamo un kernel</h1>
        </section>
        <section data-auto-animate>
          <h1>Creiamo un kernel</h1>
          <h2>in <span style="color: orangered">Rust</span></h2>
        </section>
      </section>
      <section>
        <section data-auto-animate>
          <h1 style="color: red">Problema</h1>
        </section>
        <section data-auto-animate>
          <h1 style="color: red">Problema</h1>
          <h3>Non possiamo usare Rust su bare metal</h3>
        </section>
        <section data-auto-animate>
          <h3>Non possiamo usare Rust su bare metal</h3>
          <h1 style="color: red">Perché?</h1>
        </section>
        <section data-auto-animate>
          <h1 style="color: red">Perché?</h1>
          <p>Rust, come C e C++ ha una libreria di base inclusa dal compilatore chiamata STD</p>
        </section>
        <section>
          <h1 style="color: red; ">Cosa centra?</h1>
          <p>La STD effettua system call per eseguire alcune operazioni ma essendo su bare metal non abbiamo nessun
            sistema operativo da chiamare</p>
        </section>
        <section>
          <h1 style="font-size: 90px; color: red">Significa che non possiamo usare Rust per fare un Kernel??</h1>
        </section>
        <section data-auto-animate>
          <h1 style="color: red; font-size: 120px">Certo che no!</h1>
        </section>
        <section data-auto-animate>
          <h1 style="color: red; font-size: 120px">Certo che no!</h1>
          <pre><code data-line-numbers data-noescape data-trim>
            #![no_std]

            fn main() {
                println!("Hello, world!");
            }
          </code></pre>
        </section>
        <section data-auto-animate>
          <pre data-id="code"><code data-line-numbers="4" data-noescape data-trim>
            #![no_std]

            fn main() {
                println!("Hello, world!");
            }
          </code></pre>
          <pre><code data-noescape data-trim>
            error: cannot find macro `println!` in this scope
             --> src/main.rs:4:5
              |
            4 |     println!("Hello, world!");
              |     ^^^^^^^
          </code></pre>
        </section>
        <section data-auto-animate>
          <pre data-id="code"><code data-line-numbers data-noescape data-trim>
            #![no_std]

            fn main() {
                //println!("Hello, world!");
            }
          </code></pre>
        </section>
        <section data-auto-animate>
          <pre data-id="code"><code data-line-numbers="4" data-noescape data-trim>
            #![no_std]

            fn main() {
                //println!("Hello, world!");
            }
          </code></pre>
          <pre><code data-line-numbers data-noescape data-trim>
            error: `#[panic_handler]` function required, but not found
            error: language item required, but not found: `eh_personality`
          </code></pre>
        </section>
        <section data-auto-animate>
          <pre data-id="code"><code data-line-numbers data-noescape data-trim style="overflow-y: hidden">
            #![no_std]
            use core::panic::PanicInfo;

            fn main() {
                //println!("Hello, world!");
            }

            #[panic_handler]
            fn panic(_info: &PanicInfo) -> ! {
                loop {}
            }
          </code></pre>
        </section>
        <section>
          <h1 style="color: red; font-size: 100px">Abbiamo ancora un problema</h1>
          <p>Quando si compila per un sistema operativo già esistente Rust creerà il binario in un modo che l'SO avvi la
            funzione main</p>
        </section>
        <section>
          <pre data-id="code"><code data-line-numbers="2|6-8|5" data-noescape data-trim style="overflow-y: hidden">
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
        <section data-auto-animate>
          <h1 style="font-size: 50px">Ora configuriamo il compilatore per compilare senza target</h1>
        </section>
        <section data-auto-animate>
          <h1 style="font-size: 50px">Ora configuriamo il compilatore per compilare senza target</h1>
          <h2 style="font-size: 50px; color: lightblue">e finalmente abbiamo un file binario inutilizzabile</h2>
        </section>
      </section>
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
      <section>
        <section>
          <h1 style="font-size: 60px">Beh ora che finalmente si avvia, stampiamo qualcosa basterà una semplice funzione tanto no?</h1>
        </section>
        <section>
          <h1 style="color: red">NO!</h1>
        </section>
      </section>
      <section>
        <section>
          <pre data-id="code"><code data-line-numbers="5-19|7|7-11|5-19" data-noescape data-trim style="overflow-y: hidden">
              #![no_std]
              #![no_main]
              use core::panic::PanicInfo;

              #[no_mangle]
              pub extern "C" fn _start() -> ! {
                let vga_buffer = unsafe {
                  core::slice::from_raw_parts_mut(
                      0xb8000 as *mut u8, 4000
                  )
                };

                for (i, &byte) in b"Hello World!".iter().enumerate() {
                    vga_buffer[i * 2] = byte;
                    vga_buffer[i * 2 + 1] = 0x0f;
                }

                loop {}
              }

              #[panic_handler]
              fn panic(_info: &PanicInfo) -> ! {
                  loop {}
              }
          </code></pre>
        </section>
        <section>
          <pre data-id="code"><code data-line-numbers="12-23|7" data-noescape data-trim style="overflow-y: hidden">
              #![no_std]
              #![no_main]
              use core::panic::PanicInfo;

              #[no_mangle]
              pub extern "C" fn _start() -> ! {
                  kprintf("Hello world!");

                  loop {}
              }

              fn kprintf(text: &str) {
                  let vga_buffer = unsafe {
                      core::slice::from_raw_parts_mut(
                          0xb8000 as *mut u8, 4000
                      )
                  };

                  for (i, &byte) in text.as_bytes().iter().enumerate() {
                      vga_buffer[i * 2] = byte;
                      vga_buffer[i * 2 + 1] = 0x0f;
                  }
              }

              #[panic_handler]
              fn panic(_info: &PanicInfo) -> ! {
                  loop {}
              }
          </code></pre>
        </section>
        <section>
          <img src="@/assets/qemu-hello.png">
        </section>
      </section>

    </Slides>
  </RevealContainer>
</template>