
<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6" sm="12">
        <dice-trpg-mod-edit-card ref="trpgModEditCard"></dice-trpg-mod-edit-card>
      </v-col>

      <v-col cols="12" md="6" sm="12">
        <dice-trpg-rendering-view @export-file="exportFile"></dice-trpg-rendering-view>

      </v-col>
    </v-row>

  </v-container>
</template>

<style lang="scss"></style>
<script lang="ts" setup>
import DiceTrpgModEditCard from '@/components/dice/trpg/ModEditCard.vue';
const trpgModEditCard = ref<InstanceType<typeof DiceTrpgModEditCard>>();
const exportFile = () => {
  trpgModEditCard.value?.exportTrpgModelFile();
}

</script>