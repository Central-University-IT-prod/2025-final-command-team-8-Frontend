<script setup lang="ts">
import { ref, computed } from 'vue';
import {type ClientAuthResponse, clientLogin} from "~/client";
import {useAlert} from "~/composables/useAlert";

const alert = useAlert();

// TODO: add email validation
const email = ref<string>('');
const password = ref<string>('');

const account = ref<ClientAuthResponse>()

const handleLogin = async () => {
  try{
    const response = await clientLogin({
      body: {
        email: email.value,
        password: password.value,
      }
    })
    account.value = response.data
    if (response.data != undefined) {
      console.log(response.data.client)
      localStorage.setItem('token', response.data?.token);
      alert.success("Успешный вход!");
      navigateTo('/')
    } else if (response.status == 400 || response.status == 404 || response.status == 401) {
      console.log(response.error)
      alert.error(response.error.description);
    } else {
      console.log(response.error)
      alert.error("Неизвестная ошибка");
    }
  } catch (error) {
    console.log(error);
    alert.error("Неизвестная ошибка");
  }
}

definePageMeta({
  layout: false,
})


const verified = computed(() => {
  return email.value !== '' && email.value.includes('@') && password.value !== '';
});
</script>

<template>
  <div class="flex flex-col w-screen h-full items-center justify-center p-4">
    <img src="/logo.png" class="w-[100px]" alt="logo"/>
    <div class="flex flex-col items-center">
      <h1 class="font-bold text-4xl">T-lounge</h1>
      <span class="text-lg">Лучший коворкинг в вашем городе</span>
    </div>


    <div class="mt-10 p-4 gap-4 rounded-2xl flex flex-col w-full md:w-[600px] bg-block">
      <h3 class="3xl font-medium">Войти</h3>


      <div class="w-full">
        <label>Электронная почта</label>
        <input
            v-model="email"
            type="email"
            class="rounded-md bg-[#27272A] border border-[#3F3F46] block p-2 font-thin text-white w-full">

      </div>
      <div class="w-full">
        <label>Пароль</label>
        <input
            v-model="password"
            type="password"
            class="rounded-md bg-[#27272A] border border-[#3F3F46] block p-2 font-thin text-white w-full">

      </div>

      <span>Нет аккаунта?
        <nuxt-link to='/auth/register'><span class="text-link">Зарегистрироваться</span></nuxt-link>
      </span>

      <button
              @click="handleLogin"
              :disabled="!verified"
              class="p-2 rounded-2xl text-black"
              :class="!verified ? 'bg-contrast/50' : 'bg-contrast'"
      >
        Войти
      </button>
    </div>
  </div>
</template>
