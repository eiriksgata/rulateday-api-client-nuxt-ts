<template>
  <v-menu :close-on-content-click="false" location="bottom">
    <template v-slot:activator="{ props }">
      <v-text-field v-model="formatDate" density="compact" v-bind="props" readonly variant="underlined"
        append-inner-icon="mdi-calendar-month-outline" :label="label"></v-text-field>
    </template>
    <v-date-picker v-model="datetime"></v-date-picker>
  </v-menu>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import Moment from 'moment';

// datepicker初始格式 Thu Nov 09 2023 00:00:00 GMT+0800 (中国标准时间)
const datetime = ref(new Date())
const formatDate = ref(Moment(datetime.value).format("YYYY-MM-DD HH:mm:ss"))
defineProps<{
  //标签名称
  modelValue: Date,
  label: string
}>()

const emit = defineEmits(['update:modelValue'])
// "update:modelValue"
watch(datetime, () => {
  formatDate.value = Moment(datetime.value).format("YYYY-MM-DD HH:mm:ss")
  emit('update:modelValue', datetime.value)
})

</script>