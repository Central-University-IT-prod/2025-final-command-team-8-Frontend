<script setup lang="ts">
import {User} from "lucide-vue-next";

defineProps({
  name: String,
  lastName: String,
  middleName: String,
})

</script>

<template>
  <div class="bg-zinc-900 rounded-3xl p-6 mb-4">
    <div class="flex flex-col items-center">
      <div class="w-20 h-20 bg-contrast rounded-full flex items-center justify-center mb-2">
        <User class="text-black"/>
      </div>
      <span class="text-white text-lg">{{name}} {{lastName}} {{middleName}}</span>
    </div>
  </div>
</template>