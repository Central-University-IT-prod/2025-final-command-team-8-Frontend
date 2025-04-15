<template>
  <div class="fixed bottom-0 right-0 z-50 p-4 space-y-4 pointer-events-none">
    <Alert
        v-for="toast in alerts"
        :key="toast.id"
        :message="toast.message"
        :type="toast.type"
        :duration="toast.duration"
        :auto-close="toast.autoClose"
        @close="removeAlert(toast.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { useAlert } from '~/composables/useAlert'
import Alert from '~/components/Alert.vue'

const { alerts, removeAlert } = useAlert()
</script>