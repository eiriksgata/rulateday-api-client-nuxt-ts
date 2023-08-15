<template>
  <v-container fluid>

    <v-row>
      <v-col v-show="!readingMode.enable" cols="12" md="6" sm="12">
        <DiceRecordFileInfo />
      </v-col>
      <v-col cols="12" :md="readingMode.md" sm="12">

        <DiceRecordOutRecordView />
      </v-col>
    </v-row>

    <v-btn theme="dark" :icon="readingMode.icon" elevation="5" class="float-button-style" :position="'fixed'"
      :location="'bottom right'" @click="switchReadingMode">
    </v-btn>


  </v-container>
</template>

<script setup lang="ts">

const readingMode = reactive({
  enable: false,
  md: '6',
  icon: 'mdi-eye-outline'
})

const switchReadingMode = () => {
  if (readingMode.enable) {
    readingMode.enable = false;
    readingMode.md = '6';
    readingMode.icon = 'mdi-eye-outline'
  } else {
    readingMode.enable = true;
    readingMode.md = '12';
    readingMode.icon = 'mdi-eye-off-outline';
  }
}
</script>

<style lang="scss" scoped >
.float-button-style {
  margin: 2em;
}
</style>
