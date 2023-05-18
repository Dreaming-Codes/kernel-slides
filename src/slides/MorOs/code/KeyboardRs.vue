<script lang="ts" setup>
const props = withDefaults(defineProps<{
  dataLineNumbers: string;
}>(), {
  dataLineNumbers: "",
});
</script>

<template>
      <pre><code :data-line-numbers="dataLineNumbers" data-noescape data-trim>
          use crate::sys;
          use crate::api::syscall;

          use core::sync::atomic::{AtomicBool, Ordering};
          use pc_keyboard::{layouts, DecodedKey, Error, HandleControl, KeyState, KeyCode, KeyEvent, Keyboard, ScancodeSet1};
          use spin::Mutex;
          use x86_64::instructions::port::Port;

          pub static KEYBOARD: Mutex&lt;Option&lt;KeyboardLayout&gt;&gt; = Mutex::new(None);

          pub static ALT: AtomicBool = AtomicBool::new(false);
          pub static CTRL: AtomicBool = AtomicBool::new(false);
          pub static SHIFT: AtomicBool = AtomicBool::new(false);

          pub enum KeyboardLayout {
              Azerty(Keyboard&lt;layouts::Azerty, ScancodeSet1&gt;),
              Dvorak(Keyboard&lt;layouts::Dvorak104Key, ScancodeSet1&gt;),
              Qwerty(Keyboard&lt;layouts::Us104Key, ScancodeSet1&gt;),
          }

          impl KeyboardLayout {
              fn add_byte(&mut self, scancode: u8) -&gt; Result&lt;Option&lt;KeyEvent&gt;, Error&gt; {
                  match self {
                      KeyboardLayout::Azerty(keyboard) =&gt; keyboard.add_byte(scancode),
                      KeyboardLayout::Dvorak(keyboard) =&gt; keyboard.add_byte(scancode),
                      KeyboardLayout::Qwerty(keyboard) =&gt; keyboard.add_byte(scancode),
                  }
              }

              fn process_keyevent(&mut self, event: KeyEvent) -&gt; Option&lt;DecodedKey&gt; {
                  match self {
                      KeyboardLayout::Azerty(keyboard) =&gt; keyboard.process_keyevent(event),
                      KeyboardLayout::Dvorak(keyboard) =&gt; keyboard.process_keyevent(event),
                      KeyboardLayout::Qwerty(keyboard) =&gt; keyboard.process_keyevent(event),
                  }
              }

              fn from(name: &str) -&gt; Option&lt;Self&gt; {
                  match name {
                      "azerty" =&gt; Some(KeyboardLayout::Azerty(Keyboard::new(HandleControl::MapLettersToUnicode))),
                      "dvorak" =&gt; Some(KeyboardLayout::Dvorak(Keyboard::new(HandleControl::MapLettersToUnicode))),
                      "qwerty" =&gt; Some(KeyboardLayout::Qwerty(Keyboard::new(HandleControl::MapLettersToUnicode))),
                      _ =&gt; None,
                  }
              }
          }

          pub fn set_keyboard(layout: &str) -&gt; bool {
              if let Some(keyboard) = KeyboardLayout::from(layout) {
                  *KEYBOARD.lock() = Some(keyboard);
                  true
              } else {
                  false
              }
          }

          pub fn init() {
              set_keyboard(option_env!("MOROS_KEYBOARD").unwrap_or("qwerty"));
              sys::idt::set_irq_handler(1, interrupt_handler);
          }

          fn read_scancode() -&gt; u8 {
              let mut port = Port::new(0x60);
              unsafe { port.read() }
          }

          fn send_key(c: char) {
              sys::console::key_handle(c);
          }

          fn send_csi(c: char) {
              send_key('\x1B'); // ESC
              send_key('[');
              send_key(c);
          }

          fn interrupt_handler() {
              if let Some(ref mut keyboard) = *KEYBOARD.lock() {
                  let scancode = read_scancode();
                  if let Ok(Some(event)) = keyboard.add_byte(scancode) {
                      let ord = Ordering::Relaxed;
                      match event.code {
                          KeyCode::AltLeft | KeyCode::AltRight =&gt; ALT.store(event.state == KeyState::Down, ord),
                          KeyCode::ShiftLeft | KeyCode::ShiftRight =&gt; SHIFT.store(event.state == KeyState::Down, ord),
                          KeyCode::ControlLeft | KeyCode::ControlRight =&gt; CTRL.store(event.state == KeyState::Down, ord),
                          _ =&gt; {}
                      }
                      let is_alt = ALT.load(ord);
                      let is_ctrl = CTRL.load(ord);
                      let is_shift = SHIFT.load(ord);
                      if let Some(key) = keyboard.process_keyevent(event) {
                          match key {
                              DecodedKey::Unicode('\u{7f}') if is_alt && is_ctrl =&gt; syscall::reboot(), // Ctrl-Alt-Del
                              DecodedKey::RawKey(KeyCode::ArrowUp)    =&gt; send_csi('A'),
                              DecodedKey::RawKey(KeyCode::ArrowDown)  =&gt; send_csi('B'),
                              DecodedKey::RawKey(KeyCode::ArrowRight) =&gt; send_csi('C'),
                              DecodedKey::RawKey(KeyCode::ArrowLeft)  =&gt; send_csi('D'),
                              DecodedKey::Unicode('\t') if is_shift   =&gt; send_csi('Z'), // Convert Shift-Tab into Backtab
                              DecodedKey::Unicode(c)                  =&gt; send_key(c),
                              _ =&gt; {},
                          };
                      }
                  }
              }
          }
      </code></pre>
</template>