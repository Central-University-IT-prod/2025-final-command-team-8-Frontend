<script setup lang="ts">
import { Home, AlignRight, Clock, AtSign } from "lucide-vue-next";

definePageMeta({
  layout: false,
});

const routes = [
  { name: "Главная", icon: Home, route: "/" },
  { name: "Брони", icon: AlignRight, route: "/books" },
  { name: "История", icon: Clock, route: "/history" },
  { name: "Профиль", icon: AtSign, route: "/account/profile" },
];

const route = useRoute();
</script>

<template>
  <div class="h-screen w-screen flex justify-center items-center">
    <slot />

    <teleport to="body">
      <div class="fixed bottom-0 w-full">
        <div class="backdrop-blur-lg w-full h-[80px] absolute bottom-0 z-10"></div>

        <div class="relative z-20 flex w-full max-w-[300px] mx-auto justify-between gap-4 text-center p-2">
          <nuxt-link
              v-for="(item, index) in routes"
              :key="index"
              :to="item.route"
          >
            <button
                class="flex flex-col text-center justify-normal items-center text-sm gap-2"
                :class="route.path === item.route ? 'text-link' : 'text-white/50'"
            >
              <component :is="item.icon" />
              <span>{{ item.name }}</span>
            </button>
          </nuxt-link>
        </div>
      </div>
    </teleport>
    <div class="h-[300px]"></div>
  </div>
</template>

<style scoped>
.backdrop-blur-lg {
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
