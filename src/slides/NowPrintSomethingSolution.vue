<template>
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
      <img alt="Qemu con scritto 'Hello World!'" src="@/assets/qemu-hello.png">
    </section>
  </section>
</template>