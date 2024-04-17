
<template>
  <div class="d-flex justify-center">
    <v-card style="margin-top: 50px;" :loading="loading" width="375">
      <v-card-title>Open Robot register</v-card-title>
      <v-card-text>
        <v-form ref="robotForm" v-model="valid" lazy-validation>

          <v-text-field v-model="form.machineCode" :rules="robotIdRules" label="ROBOT_ID" :disabled="loading"
            required></v-text-field>

          <v-text-field v-model="form.description" :rules="masterIdRules" label="Master_ID" required :disabled="loading"
            @keydown.enter="validate()"></v-text-field>

          <v-btn :disabled="!valid" color="success" class="mr-4 mt-4" @click="validate" block>
            生成密钥
          </v-btn>
        </v-form>
        <div class="pa-5" v-show="authId !== ''">
          <v-textarea readonly  v-model="authId" label="authentication"
            variant="outlined"></v-textarea>
          
        </div>
      </v-card-text>
    </v-card>

  </div>
</template>

<style lang="scss"></style>

<script setup lang="ts">
import { ref } from 'vue';;
import { robotOpenRegister } from '~/server/routes/robot';


const loading = ref(false);
const valid = ref(false);

const robotForm = ref();

const authId = ref('');

const form = ref<Robot>({
  id: -1,
  name: '',
  description: '',
  machineCode: '',
  expirationAt: new Date(),
  createdAt: new Date(),
  updatedAt: new Date()
})

const robotIdRules = [
  (v: string) => !!v || 'robot id is required',
  (v: string) => /^\d{3,14}$/.test(v) || 'id must be less than 14 numbers'
]

const masterIdRules = [
  (v: string) => !!v || 'Password is required',
  (v: string) => /^\d{3,14}$/.test(v) || 'id must be less than 14 numbers'
]


const validate = async () => {

  if (robotForm.value.validate()) {
    //通过验证后提交数据
    loading.value = true;
    const result: ServerResponse<Robot> = await robotOpenRegister(form.value);
    if (result.code == 0) {
      authId.value = result.data.name;
    }
    valid.value = false;
    loading.value = false;
  }
}





</script>