<template>
  <Transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
  >
    <div
        v-if="visible"
        :class="[
        'fixed bottom-4 right-4 z-50 max-w-sm w-full shadow-lg rounded-lg pointer-events-auto overflow-hidden',
        typeClasses[type]
      ]"
    >
      <div class="p-4 flex items-center">
        <div class="flex-shrink-0">
          <CheckIcon v-if="type === 'success'" class="h-6 w-6 text-white" />
          <XIcon v-else-if="type === 'error'" class="h-6 w-6 text-white" />
          <AlertTriangleIcon v-else-if="type === 'warning'" class="h-6 w-6 text-white" />
          <InfoIcon v-else class="h-6 w-6 text-white" />
        </div>
        <div class="ml-3 w-0 flex-1">
          <p class="text-sm font-medium text-white">{{ message }}</p>
        </div>
        <div class="ml-4 flex-shrink-0 flex">
          <button
              @click="close"
              class="inline-flex text-white focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span class="sr-only">Close</span>
            <XIcon class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { CheckIcon, XIcon, AlertTriangleIcon, InfoIcon } from 'lucide-vue-next'

export type AlertType = 'success' | 'error' | 'warning' | 'info' | 'default'

interface Props {
  message: string
  type: AlertType
  duration?: number
  autoClose?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  duration: 5000,
  autoClose: true,
  type: 'default'
})

const emit = defineEmits(['close'])

const visible = ref(false)

const typeClasses = computed(() => ({
  success: 'bg-green-600',
  error: 'bg-red-600',
  warning: 'bg-amber-500',
  info: 'bg-teal-600',
  default: 'bg-gray-700'
}))

const close = () => {
  visible.value = false
  setTimeout(() => {
    emit('close')
  }, 300) // Wait for transition to complete
}

let timer: number | null = null

onMounted(() => {
  visible.value = true

  if (props.autoClose) {
    timer = window.setTimeout(() => {
      close()
    }, props.duration)
  }
})

// Clear timer on component unmount
onBeforeUnmount(() => {
  if (timer) {
    clearTimeout(timer)
  }
})
</script>