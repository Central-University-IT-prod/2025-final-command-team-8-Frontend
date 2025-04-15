<script setup lang="ts">

import BookCard from "~/components/books/book-card.vue";
import {getClientReservations, type GetClientReservationsResponse} from "~/client";


const reservations = ref<GetClientReservationsResponse>();


onMounted(async ()=>{
  await fetchUserReservations()
})

const fetchUserReservations = async () => {
  try{
    const response = await getClientReservations({
      headers:{
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    console.log(response)
    if (response.status === 200) {
      reservations.value = response.data;
    }
  } catch (error) {
    const alert = useAlert()
    alert.error("Something went wrong")
    console.log(error)
  }
}

</script>

<template>
  <div class="h-full w-full p-4 md:p-8">
    <h1 class="mt-10 text-5xl font-bold ml-4">Брони</h1>
    <span class="ml-4 text-white/50">Активные бронирования</span>
    <div v-if="reservations" class="flex flex-col mt-10 gap-6">
      <BookCard
          :past="false"
        v-for="(item, index) in reservations?.filter((i)=> !i.cancelled)"
        :key="index"
        :name="item.id"
        :time-from="item.starts_at"
        :time-to="item.ends_at"/>

    </div>
  </div>

  <div class="min-h-200"/>
</template>

<style scoped>

</style>