<script setup lang="ts">
import {Calendar} from '@/components/ui/calendar'
import {type DateValue, getLocalTimeZone, today} from '@internationalized/date'
import {type Ref, ref, computed, watch, reactive} from 'vue'
import {Tabs, TabsList, TabsTrigger} from "~/components/ui/tabs";
import {cancelReservation, getReservation, rescheduleReservation} from "~/client";

const todayDate = today(getLocalTimeZone()) as DateValue

const value = ref(today(getLocalTimeZone())) as Ref<DateValue>
const seatType = ref<string>('');
const startTime = ref<string>('');
const endTime = ref<string>('');
const type = ref<string>('')

const openNotification = ref<boolean>(false);

const handleChangeOpened = () => {
  openNotification.value = false
}

const id = useRoute().params.id;
const reservation = ref();

const isTodaySelected = computed(() => value.value?.toString() === todayDate.toString());

const minTime = computed(() => {
  if (isTodaySelected.value) {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  }
  return undefined;
});

const selectedTimes = reactive(new Map<string, boolean>());

const toggleTimeSelection = (time: string) => {
  if (selectedTimes.has(time)) {
    selectedTimes.set(time, !selectedTimes.get(time));
  } else {
    selectedTimes.set(time, true);
  }
};

const handleDeleteReservation = async () => {
  try {
    await cancelReservation({
      path: { reservation_id: id.toString() },
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
    });
    navigateTo('/reservations');
  } catch (e) {
    console.error(e);
  }
};

onMounted(async () => {
  try {
    if (Array.isArray(id)) {
      console.error('Invalid reservation ID');
      return;
    }
    reservation.value = await getReservation({
      path: { reservation_id: id.toString() },
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
    });
  } catch (e) {
    console.error(e);
    navigateTo('/page-not-found');
  }
});

const submitUpdate = async () => {
  if (endTime.value <= startTime.value) {
    alert("Время конца не может быть раньше или равно времени начала");
    return;
  }

  try {
    await rescheduleReservation({
      body: {
        ends_at: endTime.value,
        seat: null,
        starts_at: startTime.value,
      },
      path: { reservation_id: id.toString() },
    });
  } catch (e) {
    console.error(e);
  }
};

watch(value, (newValue, oldValue) => {
  if (newValue < oldValue) {
    value.value = oldValue;
  }
});
</script>

<template>
  <div class="h-full flex flex-col gap-4 w-full md:p-8">
    <h1 class="mt-10 text-3xl md:text-5xl font-bold ml-4">Редактировать выбранную бронь</h1>

    <div class="mt-6 flex gap-2 justify-between px-4">
      <div class="flex w-full flex-col gap-2">
        <label for="start-time">Время начала</label>
        <input
            id="start-time"
            type="time"
            v-model="startTime"
            :min="minTime"
            @change="toggleTimeSelection(startTime)"
            class="text-lg w-full rounded-3xl bg-block px-4 py-2 focus:ring-0"
        />
      </div>

      <div class="flex w-full flex-col gap-2">
        <label for="end-time">Время конца</label>
        <input
            id="end-time"
            type="time"
            v-model="endTime"
            :min="startTime"
            @change="toggleTimeSelection(endTime)"
            class="text-lg w-full rounded-3xl bg-block px-4 py-2 focus:ring-0"
        />
      </div>
    </div>

    <div class="px-4 mt-6">
      <span class="text-xl font-medium">Выбрать дату</span>
      <Calendar v-model="value" class="rounded-3xl" :minValue="todayDate"/>
    </div>

    <div class="w-full px-4 flex flex-col gap-2">
      <span>Выберите тип места</span>
      <Tabs default-value="open-space" class="w-full rounded-3xl" v-model="type">
        <TabsList class="w-full bg-block rounded-3xl">
          <TabsTrigger class="p-3 rounded-full w-full" value="open-space">Open space</TabsTrigger>
          <TabsTrigger class="p-3 w-full rounded-full" value="cabin">Кабинка</TabsTrigger>
          <TabsTrigger class="p-3 w-full rounded-full" value="room">Комната</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>

    <button @click="submitUpdate" class="bg-contrast rounded-full mx-4 p-3 text-black">Сохранить</button>
    <button @click="openNotification = true" class="bg-destructive rounded-full mx-4 p-3 text-white">Отменить бронь</button>

    <Notification
        @onSubmit="handleDeleteReservation"
        @update:opened="handleChangeOpened"
        :opened="openNotification"
        text="Вы точно хотите отменить запись?"/>
  </div>
</template>

<style scoped></style>
