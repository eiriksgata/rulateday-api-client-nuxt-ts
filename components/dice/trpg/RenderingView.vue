<template>
  <v-card>
    <v-card-title>流程预览 <v-banner></v-banner><v-btn class="event-option-item-style">载入当前模组数据</v-btn>
      <v-btn class="event-option-item-style" @click="emit('exportFile')">
        导出当前模组文件</v-btn></v-card-title>
    <v-card-text>
      <v-card color="#757575" theme="dark">
        <v-card-title>事件ID</v-card-title>
        <v-card-text> {{}} </v-card-text>
      </v-card>

      <v-card color="#546E7A" theme="dark">
        <v-card-text><v-btn>选项</v-btn></v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<style></style>

<script setup lang="ts">
const emit = defineEmits<{
  exportFile: []
}>();
</script>