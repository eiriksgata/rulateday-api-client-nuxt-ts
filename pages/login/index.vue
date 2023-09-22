<template>
  <div class="login">
    <v-card :loading="loading" class="mx-auto my-12" max-width="374">
      <template slot="progress">
        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
      </template>
      <v-card-title>Backstage - Login </v-card-title>
      <v-card-text>
        <v-form ref="loginForm" v-model="valid" lazy-validation>
          <v-text-field v-model="form.username" :counter="20" :rules="usernameRules" label="Username" :disabled="loading"
            @blur="getCaptcha" required></v-text-field>

          <v-text-field v-model="form.password" :counter="20" :rules="passwordRules" label="Password" required
            type="password" :disabled="loading" @keydown.enter="validate()"></v-text-field>

          <v-img @click="getCaptcha" title="点击刷新验证码" :width="200" :height="50" cover :src="captchaImage"></v-img>

          <v-text-field v-model="form.captcha" :counter="20" :rules="usernameRules" label="Captcha" :disabled="loading"
            required></v-text-field>

          <v-btn :disabled="!valid" color="success" class="mr-4 mt-4" @click="validate">
            提交
          </v-btn>


          <v-btn color="error" class="mr-4 mt-4" @click="reset"> 重置表单 </v-btn>

        </v-form>
      </v-card-text>
    </v-card>


  </div>
</template>

<style>
.tools-base-btn-style {
  margin-left: 10px;
}

html {
  overflow-y: auto;
}
</style>

<script setup lang="ts">
import aes from 'crypto-js/aes';
import CryptoJS from 'crypto-js';

import { genSaltSync, hashSync } from 'bcrypt-ts'

import hex from 'crypto-js/enc-hex';
import { UseFetchOptions } from 'nuxt/app';
import { toast } from 'vue3-toastify';

type AccessTokenVo = {
  loginAccount: string,
  token: string,
  expirationTime: Date
}

type captchaVo = {
  codeId: string,
  pictureBase64: string
}

const loading = ref(false);
const valid = ref(false);

const loginForm = ref(null) as any;
const cryptoKey = hex.parse('12223455125435063425124204575516');
const cryptoIv = hex.parse('05210352473562157534214512563228');


const captchaImage = ref("https://cdn.vuetifyjs.com/images/parallax/material.jpg");


const form = reactive({
  username: '',
  password: '',
  captcha: ''
});

const usernameRules = [
  (v: any) => !!v || 'Username is required',
  (v: any) => (v && v.length <= 20) || 'Name must be less than 10 characters',
]

const passwordRules = [
  (v: any) => !!v || 'Password is required',
  (v: any) => (v && v.length <= 20) || 'Name must be less than 10 characters'
]

const validate = () => {

  if (loginForm.value.validate()) {
    //通过验证后提交数据
    loading.value = true;

    const passwordSha256 = CryptoJS.SHA256(form.username + "&" + form.password).toString(hex);

    const salt = genSaltSync(10);
    const bcHash = hashSync(passwordSha256, salt);

    const cryptoJson = {
      username: form.username,
      password: bcHash,
      captcha: form.captcha,
      timestamp: Date.parse(new Date().toString())
    }

    const ciphertext = aes.encrypt(JSON.stringify(cryptoJson), cryptoKey, { iv: cryptoIv });
    const option: UseFetchOptions<ServerResponse<AccessTokenVo>> = {
      method: "put",
      headers: {
        'Secret': ciphertext.toString()
      },
      server: true
    }

    valid.value = false;
    useFetch('/server/api/v1/authentication', option).then(({ data: response }) => {
      if (response.value?.code == 0) {
        toast.success(response.value!.message)
        localStorage.setItem("token", response.value!.data.token);

      } else {
        toast.error(response.value!.message);
        loading.value = false;
        valid.value = true;
        getCaptcha();
      }

    }).catch((error) => {
      toast.error(error);
    });


  }
}

function getCaptcha() {
  if (form.username == null || form.username == '' || form.username === undefined) {
    return;
  }
  const option: UseFetchOptions<ServerResponse<captchaVo>> = {
    method: "get",
    server: true
  }

  useFetch(`/server/api/v1/generate/captcha/${form.username}`, option).then(({ data: response }) => {
    if (response.value?.code == 0) {

      const picture = "data:image/png;base64," + response.value.data.pictureBase64;

      captchaImage.value = picture;


    } else {
      toast.error(response.value!.message);
      loading.value = false;
      valid.value = true;
    }

  }).catch((error) => {
    toast.error(error);
  });


}

function reset() {
  loginForm.value.reset();
}







</script>