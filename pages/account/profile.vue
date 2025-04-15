<script setup lang="ts">
import UserInfo from "~/components/profile/UserInfo.vue";
</script>

<template>
  <div class="h-full w-full flex flex-col justify-center items-center">
    <div class="h-full w-full p-4">
      <h1 class="mt-10 text-5xl font-bold ml-4">Профиль</h1>
      <span class="ml-4 text-white/50">История бронирований</span>
      <UserInfo/>
      <div class="max-h-[100px]">
        <div class="size-16"/>
      </div>
    </div>

    <div class="h-[100px]">
      <div class="size-16"></div>
    </div>
  </div>

</template>

