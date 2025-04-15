<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Calendar } from '@/components/ui/calendar';
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date';
import { type Ref, ref, computed, reactive, onMounted, watch } from 'vue';
import { createReservation } from "~/client";

const date = ref(today(getLocalTimeZone())) as Ref<DateValue>;

const seatType = ref<string>('');
const startTime = ref<string>('');
const endTime = ref<string>('');

const selectedSeatId = ref<string>('');

const openSpace = [
  { id: "01955f39-e15b-732e-a98f-e314831e25d8", occupied: false },
  { id: "01955f3a-0e53-7790-8db8-ce89e230ee3f", occupied: false }, // 2
  { id: "01955f3a-22c2-7b8c-96e9-82b0707391cb", occupied: false }, // 3
  { id: "01955f3a-3ad2-7063-9ab3-2f7a6e4f3a0c", occupied: false }, // 4
  { id: "01955f3a-5e12-7df9-8a56-f488c11f74d9", occupied: false }, // 5
  { id: "01955f3a-7ae2-74f5-92fc-1ff45d2597d3", occupied: false }, // 6
  { id: "01955f3a-9608-77c6-a998-41eeb64b2e9e", occupied: false }, // 7
  { id: "01955f3a-b233-7eeb-8dfd-9cea29aaa0af", occupied: false }, // 8
  { id: "01955f3a-c632-73b9-b25f-82a912a02d0b", occupied: false }, // 9
  { id: "01955f3a-e1b5-70b7-ac4b-a1a8fa94b0ac", occupied: false }, // 10
  { id: "01955f3a-f2c8-7a8f-8a8f-cbabeb37f1fe", occupied: false }, // 11
  { id: "01955f3b-0e67-739f-8108-f756c8d1be28", occupied: false }, // 12
  { id: "01955f3b-298d-73d5-9895-6144da8e851e", occupied: false }, // 13
  { id: "01955f3b-4213-7517-bdcc-9a4ae972a364", occupied: false }, // 14
  { id: "01955f3b-5578-774f-a663-942bea361d68", occupied: false }, // 15
  { id: "01955f3b-6587-7a68-b26d-43b04e88a3e1", occupied: false }, // 16
  { id: "01955f3b-7538-7d00-9d93-53125af9165e", occupied: false }, // 17
  { id: "01955f3b-8996-71dd-99b9-0a0d40d6d943", occupied: false }, // 18
  { id: "01955f3b-9aa0-7c8d-9421-ab0082f8a3f6", occupied: false }, // 19
  { id: "01955f3b-aff1-730c-98e3-cf0f4a36e3f5", occupied: false }, // 20
  { id: "01955f3b-d181-7288-a01e-e6d4a9a4150d", occupied: false }, // 21
  { id: "01955f3b-e18f-7df3-ad6d-4ba3e9f7aae9", occupied: false }, // 22
  { id: "01955f3b-fef7-7457-8dbf-8c0041d323f4", occupied: false }, // 23
  { id: "01955f3c-0ed5-75b9-8efd-e3e0e1bc9971", occupied: false }, // 24
];

const cabinList = [
  { id: "01955f3f-2258-73a3-a8c8-74dbbb454a53", occupied: false },
  { id: "01955f3f-441c-707c-a7a7-3909d10f7c82", occupied: false }, // 2
  { id: "01955f3f-6335-7dfc-ba68-ef857c02eba2", occupied: false }, // 3
  { id: "01955f40-029d-7eb3-8ce5-25e779dbf559", occupied: false }, // 4
  { id: "01955f40-1826-7444-bd67-bc022e684612", occupied: false }, // 5
  { id: "01955f40-2e8c-72f4-b53a-980cb25d6bdc", occupied: false }, // 6
  { id: "01955f40-4143-7526-b659-e6957a58c421", occupied: false }, // 7
  { id: "01955f40-4f9d-7686-a0f6-5d91ab3a5fb6", occupied: false }, // 8
  { id: "01955f40-62e6-7e57-bcdc-a35dd3d91107", occupied: false }, // 9
  { id: "01955f40-7903-762d-86e8-f7094ba3be72", occupied: false }, // 10
  { id: "01955f40-86ff-7c07-a188-a9fa2b39cb3f", occupied: false }, // 11
  { id: "01955f40-94f9-720a-ade5-19a3a66c3024", occupied: false }, // 12
];

const roomList = [
  { id: "01955f41-0e64-77fc-b9ef-d861991dee0c", occupied: false }, // 1
  { id: "01955f41-2a71-7d3c-a28b-1dc701cabf85", occupied: false }, // 2
  { id: "01955f41-40c1-7a37-8e77-469448bbde23", occupied: false }, // 3
  { id: "01955f41-4d4e-7e55-8829-14b886637297", occupied: false }, // 4
  { id: "01955f41-7adf-77fb-8044-54e55bde90bd", occupied: false }, // 5
  { id: "01955f41-8a32-7317-be42-5682b211bdfb", occupied: false }, // 6
  { id: "01955f41-9842-77b1-9fdf-5d3cfa9c3f6c", occupied: false }, // 7
  { id: "01955f41-a5f2-77e9-9afb-3eb1ceed07d4", occupied: false }, // 8
];

const placeType = ref<string>("open-space");
const selectedSpace = ref<number | null>(null);
const alert = useAlert();

const timings = reactive(new Map<string, boolean>());
const currentTime = ref<string>("08:00");

onMounted(() => {
  for (let i = 0; i < 60; i++) {
    timings.set(currentTime.value, false);
    currentTime.value = useTime(currentTime.value);
  }
  console.log(timings);
});

const formatDateTime = (date: DateValue, time: string): string => {
  const [hours, minutes] = time.split(":").map(Number);
  const jsDate = date.toDate(getLocalTimeZone());
  jsDate.setHours(hours, minutes, 0, 0);
  return jsDate.toISOString();
};

const handleSendRequestToBook = async () => {
  console.log('handle request invoked')
  try {
    if (selectedSeatId.value !== '') {
      const body = {
        starts_at: formatDateTime(date.value, startTime.value),
        ends_at: formatDateTime(date.value, endTime.value),
        seat_id: selectedSeatId.value,
      };
      console.log(body);
      const response = await createReservation({
        body: body,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        alert.success("Успешно создано!");
      }
    }
  } catch (e) {
    console.error(e);
    alert.error("Ошибка, попробуйте ещё раз");
  }

  navigateTo('/books')
};

const timeError = ref<string | null>(null);

const canBook = computed(() => {
  return selectedSeatId.value !== '' && startTime.value !== '' && endTime.value !== '';
});

watch([startTime, endTime], ([newStart, newEnd]) => {
  if (newStart && newEnd) {
    const [startHours, startMinutes] = newStart.split(':').map(Number);
    const [endHours, endMinutes] = newEnd.split(':').map(Number);

    if (endHours < startHours || (endHours === startHours && endMinutes <= startMinutes)) {
      timeError.value = "Время окончания должно быть позже времени начала";
      endTime.value = newStart;
    } else {
      timeError.value = null;
    }
  }
});
</script>

<template>
  <div class="h-full w-full flex flex-col gap-4 md:p-8">
    <h1 class="mt-10 text-5xl font-bold ml-4">Забронировать место</h1>
    <div class="flex-1 w-full px-4">
      <div class="w-full text-lg flex flex-col gap-4 justify-center text-start">
        <span>Выберите тип месте</span>
        <Tabs class="w-full rounded-3xl" v-model="placeType">
          <TabsList class="w-full bg-block rounded-3xl">
            <TabsTrigger class="p-3 rounded-full w-full" value="open-space">Open space</TabsTrigger>
            <TabsTrigger class="p-3 w-full rounded-full" value="cabin">Кабинка</TabsTrigger>
            <TabsTrigger class="p-3 w-full rounded-full" value="room">Комната</TabsTrigger>
          </TabsList>
        </Tabs>
        <div class="bg-block rounded-full p-4 flex justify-between">
          <span>Сейчас свободно мест: </span>
          <span>123</span>
        </div>
        <!-- Space Map -->
        <div class="w-full mb-4 text-black">
          <h2 class="text-lg font-medium mb-2">Выберите место:</h2>
          <div
              class="grid gap-3 p-4 bg-block rounded-3xl"
              :class="{
              'grid-cols-4 md:grid-cols-6': placeType === 'open-space',
              'grid-cols-3 md:grid-cols-4': placeType === 'cabin',
              'grid-cols-2 md:grid-cols-4': placeType === 'room'
            }"
          >
            <!-- Open Space -->
            <template v-if="placeType === 'open-space'">
              <div
                  v-for="(item, index) in openSpace"
                  :key="item.id"
                  @click="selectedSeatId = item.id"
                  :class="[
                  'rounded-lg cursor-pointer w-20 h-20 flex items-center justify-center transition-all',
                  selectedSeatId === item.id ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                ]"
              >
                <span>O {{ index + 1 }}</span>
              </div>
            </template>
            <!-- Cabin -->
            <template v-if="placeType === 'cabin'">
              <div
                  v-for="(item, index) in cabinList"
                  :key="item.id"
                  @click="selectedSeatId = item.id"
                  :class="[
                  'rounded-lg cursor-pointer w-32 h-32 flex items-center justify-center transition-all',
                  selectedSeatId === item.id ? 'bg-contrast text-white' : 'bg-gray-200 hover:bg-gray-300'
                ]"
              >
                <span>O {{ index + 1 }}</span>
              </div>
            </template>
            <!-- Room -->
            <template v-if="placeType === 'room'">
              <div
                  v-for="(item, index) in roomList"
                  :key="item.id"
                  @click="selectedSeatId = item.id"
                  :class="[
                  'rounded-lg cursor-pointer w-20 h-20 flex items-center justify-center transition-all',
                  selectedSeatId === item.id ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                ]"
              >
                <span>O {{ index + 1 }}</span>
              </div>
            </template>
          </div>
        </div>
      </div>

      <Calendar v-model="date" :weekday-format="'short'" class="rounded-3xl" />

      <div class="mt-6 flex gap-2 justify-between px-4">
        <div class="flex w-full flex-col gap-2">
          <label for="start-time">Время начала</label>
          <input
              id="start-time"
              type="time"
              v-model="startTime"
              :class="{ '!border-green-500': startTime && !timeError }"
              class="text-lg w-full rounded-3xl bg-block px-4 py-2 focus:ring-0 transition-all"
          />
        </div>
        <div class="flex w-full flex-col gap-2">
          <label for="end-time">Время окончания</label>
          <input
              id="end-time"
              type="time"
              v-model="endTime"
              :min="startTime"
              :class="{
              '!border-red-500': timeError,
              '!border-green-500': endTime && !timeError
            }"
              class="text-lg w-full rounded-3xl bg-block px-4 py-2 focus:ring-0 transition-all"
          />
        </div>
      </div>

      <div v-if="timeError" class="px-4 text-red-500 text-sm">
        {{ timeError }}
      </div>

      <div
          v-if="startTime && endTime && !timeError"
          class="px-4 py-2 mx-4 bg-green-100 text-green-700 rounded-lg transition-all"
      >
        Выбрано время: {{ startTime }} - {{ endTime }}
      </div>
    </div>

    <div class="min-h-[200px]"></div>

    <teleport to="body">
      <button
          @click="handleSendRequestToBook"
          class="absolute w-[50vw] rounded-full p-3 bottom-20 text-lg font-medium transition-all duration-200"
          :class="{
          'bg-contrast text-black': canBook,
          'bg-gray-300 text-gray-500': !canBook
        }"
          :disabled="!canBook"
      >
        {{ selectedSpace ? `Забронировать ${placeType === 'open-space' ? 'место' : placeType === 'cabin' ? 'кабинку' : 'комнату'} ${selectedSpace}` : 'Выберите место' }}
      </button>
    </teleport>
  </div>
</template>

