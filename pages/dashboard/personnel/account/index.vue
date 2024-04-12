<template>
  <v-row>
    <v-col  md="4" sm="4">
      <v-card class="ma-3">
        <v-card-title>凭证管理</v-card-title>
        <v-card-text>
          <v-sheet>
            <v-form ref="form">
              <v-text-field :rules="nameRules" v-model="username" :counter="20" label="账号" required></v-text-field>
              <v-text-field :rules="nameRules" type="password" v-model="oldPassword" label="原密码" :counter="20"
                required></v-text-field>
              <v-text-field :rules="nameRules" type="password" v-model="newPassword" label="新密码" :counter="20"
                required></v-text-field>
              <v-text-field :rules="nameRules" type="password" v-model="newPasswordCheck" label="新密码确认"
                :counter="20"></v-text-field>
              <v-btn @click="validate" block class="mt-2" color="primary">提交</v-btn>
            </v-form>
          </v-sheet>
        </v-card-text>

      </v-card>
    </v-col>

    <v-col md="4" sm="4">
      <v-card class="ma-3">
        <v-card-title>账号凭证</v-card-title>

        <v-card-text>
          <v-sheet>
            <VuetifyTimePicker v-model="expireDate" label="过期时间" />
            <v-btn @click="createJwt" block class="mt-2" color="primary">生成JWT</v-btn>
            <v-textarea :rows="8" v-model="jwtGenResult" label="JWT"></v-textarea>
          </v-sheet>
        </v-card-text>

      </v-card>
    </v-col>
  </v-row>
</template>


<style scoped></style>
<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue'
import { userPasswordReset, userJwtGen } from '~/server/api/user';
import CryptoJS from 'crypto-js';

const username = ref('');
const oldPassword = ref('');
const newPassword = ref('');
const newPasswordCheck = ref('');
const form = ref();

const expireDate = ref(new Date());

const jwtGenResult = ref('');

const nameRules = ref([
  (v: string) => !!v || '必填',
  (v: string) => (v && v.length > 4) || '长度要大于4',
])

async function validate() {
  const { valid } = await form.value.validate()
  if (valid) {
    if (newPassword.value !== newPasswordCheck.value) {
      useNuxtApp().$toast.error("两次密码不一致");
    } else {
      const oldPasswordSha256 = CryptoJS.SHA256(username.value + "&" + oldPassword.value).toString(CryptoJS.enc.Hex);
      const newPasswordSha256 = CryptoJS.SHA256(username.value + "&" + newPassword.value).toString(CryptoJS.enc.Hex);
      const result = await userPasswordReset(oldPasswordSha256, newPasswordSha256);
    }
  }
}

function reset() {
  form.value.reset()
}

async function createJwt() {
  const result = await userJwtGen(new Date(), expireDate.value);
  jwtGenResult.value = result.data.token;
}

</script>