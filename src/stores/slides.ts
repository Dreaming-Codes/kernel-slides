import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useSlidesStore = defineStore('counter', () => {
    const currentSlide = ref(0)

    function next() {
        currentSlide.value++
    }

    function prev() {
        currentSlide.value--
    }

    return {currentSlide, next, prev}
})
