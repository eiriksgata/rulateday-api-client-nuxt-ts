<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="6">
          <FileInfo />
        </v-col>
        <v-col cols="6">
          <OutRecordView />
        </v-col>
      </v-row>
    
    </v-container>
  </div>
</template>

<script setup>
import FileInfo from './FileInfo.vue';
import OutRecordView from './OutRecordView.vue';


</script>

<style></style>
