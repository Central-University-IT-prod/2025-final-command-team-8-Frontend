<script setup lang="ts">
import { ref } from 'vue';
import {
  deleteClientAccount,
  editClientAccount,
  getCurrentClientAccount,
  type GetCurrentClientAccountResponse
} from "~/client";
import {LogOut, Trash2, Pencil} from "lucide-vue-next";
import Notification from "../notification.vue";
import {navigateTo} from "nuxt/app";
import ProfileCard from "../Profilecard.vue";
import {useAlert} from "~/composables/useAlert";

const alert = useAlert();

const client = ref<GetCurrentClientAccountResponse>();

onMounted(async () => {
    const response = await getCurrentClientAccount({
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })

    if (response.status === 200) {
      client.value = response.data;
    } else {
      console.error(response.error);
      alert.error("Не получилось получить аккаунт");
    }
})

const notificationOpened = ref<boolean>(false);

// const account = ref<GetCurrentClientAccountResponse>();

const toggleNotification = async () =>{
  try {
    const response = await editClientAccount({
      headers:{
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
      },
      body:{
        send_notifications: client.value?.send_notifications,
      }
    })

    if (response.status === 200) {
      console.log(response);
      alert.success("Изменено успешно")
    } else {
      console.error(response.error);
      alert.error("Не удалось изменить")
    }
  } catch (error) {
    console.error(error);
    alert.error("Не удалось изменить")
  }
}


const handleDeleteAccount = async () => {
  try {
    const response = await deleteClientAccount({
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
    if (response.status === 200) {
      console.log('Account Deleted');
      alert.success("Аккаунт удалён!");
      navigateTo('/auth/login');
    } else {
      console.log(response.error);
      alert.error(response.error?.description ?? "Неизвестная ошибка");
    }
  }
  catch (error) {
    console.log(error)
    alert.error("Неизвестная ошибка");
  }
}


const handleQuitFromAccount = () =>{
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  navigateTo('/auth/login');
}


</script>

<template>
  <div class=" w-full flex flex-col justify-center bg-black text-white mt-10 ">
    <div v-if="client" class="w-full mx-auto flex flex-col justify-between min-w-p">

      <ProfileCard :name="client!.name" :last-name="client!.surname" :middle-name="client!.patronymic"/>

      <div class="bg-zinc-900 rounded-3xl p-4 mb-4">
        <div class="flex items-center justify-between">
          <span>Отправлять уведомления</span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" :checked="client?.send_notifications" @change="client && (client.send_notifications = ($event.target as HTMLInputElement).checked)" @click="toggleNotification" class="sr-only peer">
            <div class="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
          </label>
        </div>
      </div>

        <div @click="navigateTo('/account/edit-account')" class="text-center bg-contrast text-black rounded-3xl py-2 mb-4 cursor-pointer flex flex-row align-middle justify-center">
          <Pencil class="mt-2"/>
          <p class="p-2">
            Редактировать аккаунт
          </p>
        </div>

        <div @click="handleQuitFromAccount" class="text-center text-red-500 bg-background rounded-3xl py-2 mb-4 cursor-pointer flex flex-row align-middle justify-center">
          <LogOut class="mt-2"/>
          <p class="p-2">
            Выйти из аккаунта
          </p>
        </div>

        <div class="text-center text-red-500 bg-background rounded-3xl py-2 mb-4 cursor-pointer flex flex-row align-middle justify-center">
          <Trash2 class="mt-2"/>
          <p @click="notificationOpened = true" class="p-2 ">
            Удалить
          </p>
        </div>

    </div>
  </div>
  <Notification :opened="notificationOpened"
                @onSubmit="handleDeleteAccount"
                @update:opened="notificationOpened = false"
                text="Вы точно хотите удалить аккаунт?"/>
</template>

<style>
body {
  background-color: black;
  color: white;
}
</style>