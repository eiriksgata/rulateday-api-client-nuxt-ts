<template>
  <VRow>
    <VCol md="6">
      <VCard>
        <VCardTitle>
          弹幕工具授权V2
        </VCardTitle>
        <VCardItem>
          
          <VCardText>
            <v-sheet class="mx-auto" width="300">
              <v-form ref="genkeyForm" v-model="valid" lazy-validation>
                <VuetifyTimePicker v-model="form.issuedAt" label="起始时间" required />
                <VuetifyTimePicker v-model="form.expireDate" label="过期时间" required />
                <v-text-field v-model="form.license" :rules="rules" label="序列号" required></v-text-field>

                <v-btn color="primary" :disabled="!valid" class="mt-2" block @click="validate">生成</v-btn>


              </v-form>


              <VTextarea v-model="token" :rows="8"></VTextarea>

            </v-sheet>

          </VCardText>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>

</template>

<script lang="ts" setup>
import { tokenGenerate } from '~/server/routes/eirctool';

const genkeyForm = ref();
const valid = ref(false);
const token = ref('')


const rules = ref([
  (v: string) => !!v || '必填',
  (v: string) => (v && v.length > 4) || '长度要大于4'
])

const form = ref<EircbcToolTokenGenerateVo>({
  license: '',
  issuedAt: new Date(),
  expireDate: new Date()
})

const validate = async () => {
  if (genkeyForm.value.validate()) {
    token.value = (await tokenGenerate(form.value)).data
  }
}




</script>