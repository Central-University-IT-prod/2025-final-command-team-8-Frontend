<script setup lang="ts">
import {Pencil, Trash} from 'lucide-vue-next'
import OpenedBookDialog from "~/components/books/opened-book-dialog.vue";
import {cancelReservation} from "~/client";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  number: Number,
  timeFrom: String,
  timeTo: String,
  name: String,
  cost: Number,
  past: Boolean,
  id: String
})

const infoDialogOpened = ref<boolean>(false);
const notificationOpened = ref<boolean>(false);

const updateOpened = () =>{
  infoDialogOpened.value = false;
  notificationOpened.value = false;
}

const handleDeleteReservation =async () =>{
  try{
    const response = await cancelReservation({
      path: {
        reservation_id: props.id
      },
      headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`},
    })
    console.log(response)

  } catch (error) {
    console.error(error)
  }
}
const handleUpdate = () =>{

}
</script>

<template>
  <div class=" flex flex-col rounded-3xl px-8 py-4 hover:-translate-y-1 transition-all"
       :class="props.past ? 'bg-black' :  'bg-block'"

  >

      <div class="w-full text-2xl flex justify-between">
        <span class="text-4xl"  >Бронь {{props.number}}</span>
        <span>{{props.timeFrom}} - {{props.timeTo}}</span>
      </div>
      <div class="border-background my-2 h-[2px] border-b "/>
      <div class="w-full flex gap-4 justify-between">
        <div class="flex-1">
          <div class="w-full flex justify-between">
            <span>Место: </span>
            <span>{{props.name}}</span>
          </div>
          <div class="flex">
            <div class="w-full flex justify-between">
              <span>Стоимость: </span>
              <span>{{props.cost}}</span>
            </div>
          </div>
        </div>
      </div>

    <div v-if="!past" class="w-full mt-6 flex items-center justify-between gap-2">
      <button @click="navigateTo('/3-reservation')" class=" p-2 rounded-2xl text-link/50 bg-background"><Pencil/></button>
      <button
          @click="infoDialogOpened = !infoDialogOpened"
          class="flex-1 rounded-full  py-2 text-black bg-contrast">
        Показать QR-код
      </button>
      <button @click="handleDeleteReservation" class=" p-2 rounded-2xl text-destructive/50 bg-background"><Trash/></button>
    </div>
  </div>
  <OpenedBookDialog @update:opened="updateOpened" :id="id" :opened="infoDialogOpened"/>
  <Notification @update:opened="updateOpened" :opened="notificationOpened" text="Вы уверены, что хотите отменить бронь?"/>


</template>

<style scoped>

</style>