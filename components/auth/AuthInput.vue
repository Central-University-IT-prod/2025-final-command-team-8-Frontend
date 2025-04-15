<script setup lang="ts">


const props = defineProps({
  label: String,
  placeholder: String,
  type: String,
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="flex flex-col gap-1 w-full">
    <label :class="'text-white ml-1 text-sm block'">{{props.label}}</label>
    <input
        v-model="props.modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :placeholder="props.placeholder"
        :type="props.type"
        class="rounded-md bg-[#27272A] border border-[#3F3F46] block p-2 font-thin text-white w-full"
    />

  </div>
</template>

<style scoped>

</style>