import { defineNuxtPlugin } from '#app'
import { useAlert } from '~/composables/useAlert'

export default defineNuxtPlugin((nuxtApp) => {
    const alert = useAlert()

    // Make toast available globally via $toast
    nuxtApp.provide('alert', alert)
})