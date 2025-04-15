<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {ArrowRight} from "lucide-vue-next";

const time = ref(new Date())

onMounted(() => {
  setInterval(() => {
    time.value = new Date()
  }, 1000)
})

const formattedTime = computed(() => {
  return time.value.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
})
</script>

<template>
  <div class="h-full w-full flex flex-col justify-center items-center">
    <div class="h-full w-full  md:p-8">
      <h1 class="mt-10 text-5xl font-bold ml-4">T-lounge</h1>
      <span class="ml-4 text-white/50">Привет, laynexx</span>

      <div class="flex flex-col mt-10 gap-6">
        <div class="flex-1 p-4 flex gap-4 flex-col">
          <div class="flex  w-full gap-2 ">
            <div class="size-40 p-2 bg-block rounded-3xl flex flex-col gap-2">
              <span class="font-medium">Свободные места</span>
              <div class="flex-1 w-full h-full flex items-center justify-center">
                <span class="text-4xl pb-6 font-medium">34</span>
              </div>
            </div>

            <div class="size-40 p-2 bg-block rounded-3xl flex flex-col justify-center items-center gap-2">
              <span class="font-medium text-4xl">{{ formattedTime }}</span>
            </div>

            <div class="size-40 p-2 bg-block rounded-3xl flex flex-col gap-2">
              <span class="font-medium">Накст победа уже</span>
              <div class="flex-1 w-full h-full flex items-center justify-center">
                <span class="text-4xl pb-6 font-medium">69 лет</span>
              </div>
            </div>
          </div>

          <div class="rounded-3xl overflow-hidden">
            <img
                src="https://spb.pageclub.ru/wp-content/uploads/2023/03/coworking-space-instrumentalnaya-page-spb-metro-petrogradskaya-photo-20-1.webp"
                alt="T-lounge interior with people working"
                class="w-full h-48 object-cover"
            />
          </div>

          <div class="flex flex-col gap-5 w-full">
            <nuxt-link to="https://t.me/laynexx">
              <div class="flex justify-between p-4 hover:bg-gray-400 bg-block rounded-full">
                <span class="text-lg">Написать в поддержку</span>
                <ArrowRight/>
              </div>
            </nuxt-link>


            <nuxt-link class="w-full" to="/book/new-book">
              <button class="w-full bg-contrast text-black py-4 rounded-full font-medium text-lg mb-8">
                Забронировать
              </button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
