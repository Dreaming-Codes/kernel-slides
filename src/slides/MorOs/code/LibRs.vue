<script lang="ts" setup>
const props = withDefaults(defineProps<{
  dataLineNumbers: string;
}>(), {
  dataLineNumbers: "",
});
</script>

<template>
      <pre><code :data-line-numbers="dataLineNumbers" data-noescape data-trim>
        #![no_std]
        #![cfg_attr(no_main)]
        #![feature(alloc_error_handler)]

        extern crate alloc;

        #[macro_use]
        pub mod api;

        #[macro_use]
        pub mod sys;

        pub mod usr;

        use bootloader::BootInfo;

        const KERNEL_SIZE: usize = 2 &lt;&lt; 20; // 2 MB

        pub fn init(boot_info: &'static BootInfo) {
            sys::vga::init();
            sys::gdt::init();
            sys::idt::init();
            sys::pic::init(); // Enable interrupts
            sys::keyboard::init();
            sys::time::init();

            log!("MOROS v{}\n",
                  option_env!("MOROS_VERSION")
                      .unwrap_or(env!("CARGO_PKG_VERSION")));
            sys::mem::init(boot_info);
            sys::cpu::init();
            sys::pci::init(); // Require MEM
            sys::net::init(); // Require PCI
            sys::ata::init();
            sys::fs::init(); // Require ATA
            sys::clock::init(); // Require MEM
        }

        #[alloc_error_handler]
        fn alloc_error_handler(layout: alloc::alloc::Layout) -&gt; ! {
            let csi_color = api::console::Style::color("LightRed");
            let csi_reset = api::console::Style::reset();
            printk!("{}Error:{} Could not allocate {} bytes\n",
                    csi_color, csi_reset, layout.size());
            hlt_loop();
        }

        pub fn hlt_loop() -&gt; ! {
            loop {
                x86_64::instructions::hlt();
            }
        }
      </code></pre>
</template>