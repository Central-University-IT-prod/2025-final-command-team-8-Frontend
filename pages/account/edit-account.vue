<script setup lang="ts">

import {
  getCurrentClientAccount,
  editClientAccount,
  type GetCurrentClientAccountResponse,
} from "~/client";

const account = ref<GetCurrentClientAccountResponse>();

const password = ref<string>('');
const oldPassword = ref<string>('');
const verifyPassword = ref<string>('');

const changePassword = ref<boolean>(false);

onMounted(async ()=>{
  try{
    const response = await getCurrentClientAccount({
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
    account.value = response.data
  }
  catch(e){
    console.error(e);
  }
})
const handleUpdateUser = async () =>{
  try{
    console.log(account.value?.name)
    const response = await editClientAccount({
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body:{
        name: account.value?.name,
        surname: account.value?.surname,
        patronymic: account.value?.patronymic,
        email: account.value?.email,
      }
    })
    console.log(response)
  }
  catch(e) {
    console.log(e);
  }
  if (changePassword && password.value.length >=6 && oldPassword.value.length >= 6) {
    // const response = await
  }
}


const canChangePassword = computed(()=>{
  return password.value == verifyPassword.value;
})

</script>

<template>
  <div class="h-full w-full flex flex-col justify-center items-center">
    <div class="h-full w-full p-4 md:p-8">
      <h1 class="mt-10 text-5xl font-bold ml-4">Редактировать аккаунт</h1>

      <div v-if="account" class="flex px-2 flex-col gap-4">

        <div class="w-full flex flex-col gap-2 justify-between">
          <AuthInput label="Имя" v-model="account.name"/>
          <AuthInput label="Фамилия" v-model="account.surname"/>
          <AuthInput label="Отчество" v-model="account.patronymic"/>
        </div>

        <div class="w-full flex justify-center items-center gap-2">
          <input
              v-model="changePassword"
              id="input"
              type="checkbox" class="rounded-xl  border-contrast"
          />
          <label for="input">Изменить пароль?</label>
        </div>

        <div v-if="changePassword" class="w-full flex flex-col gap-2">
          <AuthInput label="Старый пароль" v-model="oldPassword"/>
          <div class="w-full flex gap-4 justify-between">
            <AuthInput label="Новый пароль" v-model="password"/>
            <AuthInput label="Повторить пароль" v-model="verifyPassword"/>
          </div>

        </div>

        <button @click="handleUpdateUser" class="mt-4 text-black py-2 px-4 bg-contrast rounded-full w-full">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>