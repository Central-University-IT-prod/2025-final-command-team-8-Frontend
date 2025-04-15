<script setup lang="ts">
import { ref, computed } from 'vue';
import {registerClient} from '~/client'
import {ValidateUserData} from "~/zod/zod";

const email = ref<string>('');
const password = ref<string>('');
const verifyPassword = ref<string>('');
const firstName = ref<string>('');
const lastName = ref<string>('');
const patronym = ref<string>('');

const mainDataFilled = ref<boolean>(false);
const alert = useAlert();

const verified = computed(() => {
  return email.value !== '' && password.value !== '' && password.value === verifyPassword.value;
});


definePageMeta({
  layout: false,
})

const checkValidations = () =>{
  ValidateUserData({
    firstname : firstName.value,
    lastname : lastName.value,
    email : email.value,
    password : password.value,
  })
}

const submitUser = async () => {
  try {
    const response = await registerClient({
      body: {
        surname: firstName.value,
        patronymic: patronym.value,
        name: lastName.value,
        email: email.value,
        password: password.value,
        send_notifications: true,
      }
    });

    console.log(response);

    if (response.status === 409) {
      alert.error("Account already exists");
    } else if (response.status === 200) {
      if (response.data ) {
        localStorage.setItem("token", response.data.token);
        navigateTo('/')
      }
    } else{
      alert.error("Что-то пошло не так...")
    }
  } catch (error) {
    console.error("Request failed", error);
  }
};

</script>

<template>
  <div class="flex flex-col w-screen h-full items-center justify-center ">
    <img src="/logo.png" class="w-[100px]" alt="logo"/>
    <div class="flex flex-col items-center">
      <h1 class="font-bold text-4xl">T-lounge</h1>
      <span class="text-lg">Лучший коворкинг в вашем городе</span>
    </div>


    <div v-if="!mainDataFilled" class="mt-10 p-4 gap-4 rounded-2xl flex flex-col w-full md:w-[600px] bg-block">
      <h3 class="3xl font-medium">Зарегистрироваться</h3>


      <AuthInput label="Почта" type="text" v-model="email"/>
      <AuthInput label="Пароль" type="password" v-model="password"/>
      <AuthInput label="Повторить пароль" type="password" v-model="verifyPassword"/>


      <span>Уже есть аккаунт?

        <nuxt-link to='/auth/login'><span class="text-link">Войти</span></nuxt-link>
      </span>

      <!--      @click="mainDataFilled = true"-->
      <button
          @click="mainDataFilled=true"
          :disabled="!verified"
          class="p-2 rounded-2xl text-black"
          :class="!verified ? 'bg-contrast/50' : 'bg-contrast'"
      >
        Дальше
      </button>
    </div>

    <div v-else class="p-4 mt-10 rounded-2xl flex flex-col min-w-full gap-2 bg-block">
      <button class="text-left" @click="mainDataFilled = false">Назад</button>
      <div class="flex gap-2">
        <AuthInput label="Имя" v-model="firstName"/>
        <AuthInput label="Фамилия" v-model="lastName"/>
        <AuthInput label="Отчество" v-model="patronym"/>
      </div>
      <button
          @click="submitUser"
          class="p-2 rounded-xl text-black bg-contrast">Зарегистрироваться</button>
    </div>
  </div>
</template>
