<script setup lang="ts">
import BookCard from "~/components/books/book-card.vue";


// TODO: как только обновят сваггер, переделать получение под него
onMounted(()=>{
  // fetchUserReservations();
})

// const fetchtUserReservations = async () => {
//   const response = await getUserReservations({
//     headers{
//       "Authorization": `Bearer ${fetchtUserReservations}`,
//     }
//   })
// }
</script>

<template>
  <div class="h-full w-full p-4 md:p-8">
    <h1 class="mt-10 text-5xl font-bold ml-4">История</h1>
    <span class="ml-4 text-white/50">История бронирований</span>
    <div class="flex flex-col mt-10 gap-6">
      <BookCard
          :cost="1000"
          name="name"
          time="14:30"
          :number="30"
          :past=true
      />
      <BookCard
          :cost="1000"
          name="name"
          time="14:30"
          :number="30"
          :past=true
      />
      <BookCard
          :cost="1000"
          name="name"
          time="14:30"
          :number="30"
          :past=true
      />
      <BookCard
          :cost="1000"
          name="name"
          time="14:30"
          :number="30"
          :past=true
      />
    </div>
  </div>
</template>

<style scoped>

</style>