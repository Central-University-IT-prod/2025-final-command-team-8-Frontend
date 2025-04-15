<script setup lang="ts">
import VueQrcode from '@chenfengyuan/vue-qrcode';

const props = defineProps({
 opened: Boolean,
  id: String,
})
const emit = defineEmits(['update:opened'])
1
</script>

<template>
  <transition name="fade">
    <div v-if="props.opened" class="fixed inset-0 top-0 left-0 p-4 flex flex-col gap-6 rounded-3xl shadow-black shadow-3xl">
      <div
          @click.self="emit('update:opened')"
          class="bg-black/50 w-screen h-screen absolute inset-0 top-0 left-0 backdrop-blur-lg z-10"/>

<!--      -->
      <div class="z-20 class=flex flex-col gap-8  items-center">

        <div class="w-full p-4 text-3xl rounded-full">
          <h1 class="font-medium">Заказ №3</h1>
        </div>

        <div class="w-full flex flex-col gap-4  rounded-3xl justify-center items-center bg-block p-4">
          <span class="text-xl font-medium">QR-код для подтверждения</span>
          <vue-qrcode :value="id"
                      :options="{ width: 200 }" class="rounded-3xl" ></vue-qrcode>
        </div>

        <div class="bg-block mt-4 p-4 rounded-3xl w-full">
          <div class="w-full flex justify-center">
            <button
                @click="emit('update:opened')"
                class="absolute bg-contrast w-[90vw] z-40 bottom-20 p-3 rounded-full">Закрыть</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>


<style scoped>
</style>