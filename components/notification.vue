<script setup lang="ts">
const props = defineProps({
  opened: Boolean,
  text: String,
})
const emit = defineEmits(['update:opened', 'onSubmit'])

const handleSubmit = () => {
  emit('onSubmit');
  emit('update:opened');
}
</script>

<template>
  <div v-if="props.opened" class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
    <div @click.self="emit('update:opened')" class="absolute top-0 left-0 right-0 bottom-0 bg-black/20 backdrop-blur-md"></div>

    <div class="relative p-6 bg-block rounded-3xl shadow-lg max-w-md w-full flex flex-col items-center">
      <span class="text-sm text-gray-500">Уведомление</span>
      <div class="flex-1 mt-4">
        <span>{{ props.text }}</span>
        <div class="w-full flex justify-between gap-4 p-4 mt-4">
          <button
              class="p-3 w-[120px] bg-blue-500 text-white rounded-full"
              @click="handleSubmit"
          >
            Подтвердить
          </button>
          <button
              class="p-3 w-[120px] bg-destructive text-white rounded-full"
              @click="emit('update:opened')"
          >
            Отменить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
