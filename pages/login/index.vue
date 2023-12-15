<template>
  <div class="login">
    <div class="d-flex justify-center">
      <v-card style="margin-top: 50px;" :loading="loading" width="375">
        <v-card-title>Backstage - Login </v-card-title>
        <v-card-text>
          <v-form ref="loginForm" v-model="valid" lazy-validation>
            <v-text-field v-model="form.username" :counter="20" :rules="usernameRules" label="Username"
              :disabled="loading" required></v-text-field>

            <v-text-field v-model="form.password" :counter="20" :rules="passwordRules" label="Password" required
              type="password" :disabled="loading" @keydown.enter="validate()"></v-text-field>

            <!-- <v-card :loading="loading">
            <v-img lazy-src="/images/material.jpg" @click="getCaptcha" title="点击刷新验证码" :max-height="50"
              :disabled="loading" :src="captchaImage" class="bg-grey-lighten-2">
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                </div>
              </template>
            </v-img>
          </v-card> -->

            <v-input :error-messages="getSliderCaptchaBtnErrMsg" v-show="!sliderCaptchaBoxShow" required>
              <v-btn theme="dark" @click="getSliderCaptcha" block>进行滑块认证</v-btn>
            </v-input>

            <div v-show="sliderCaptchaBoxShow">
              <verify-slider-captcha ref="sliderCaptcha" :username="form.username"
                @verify-callback="sliderVerifyEventCallback"></verify-slider-captcha>
            </div>
            <v-radio-group v-show="sliderCaptchaBoxShow" required :rules="captchaRule" v-model="sliderCaptchaState">
              <v-radio label="滑块验证通过状态" value="1" color="success" :readonly="true"></v-radio>
            </v-radio-group>
            <v-btn :disabled="!valid" color="success" class="mr-4 mt-4" @click="validate">
              提交
            </v-btn>
            <v-btn :disabled="loading" color="error" class="mr-4 mt-4" @click="reset"> 重置表单 </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>




  </div>
</template>

<style scoped>
.login {
  background-image: url('/images/material.jpg');
  height: 100vh;
}
</style>

<script setup lang="ts">
import CryptoJS from 'crypto-js';
import { genSaltSync, hashSync } from 'bcrypt-ts'
import { toast } from 'vue3-toastify';
import type { UseFetchOptions } from 'nuxt/app';

type AccessTokenVo = {
  loginAccount: string,
  token: string,
  expirationTime: Date
}


const loading = ref(false);
const valid = ref(false);

const sliderCaptchaBoxShow = ref(false);
const sliderCaptchaState = ref('');

const loginForm = ref();
const cryptoKey = CryptoJS.enc.Hex.parse('12223455125435063425124204575516');
const cryptoIv = CryptoJS.enc.Hex.parse('05210352473562157534214512563228');

const sliderCaptcha = ref();

const getSliderCaptchaBtnErrMsg = ref('');

const form = reactive({
  username: '',
  password: '',
  captcha: 0
});

const usernameRules = [
  (v: any) => !!v || 'Username is required',
  (v: any) => (v && v.length <= 20) || 'Name must be less than 10 characters',
]

const passwordRules = [
  (v: any) => !!v || 'Password is required',
  (v: any) => (v && v.length <= 20) || 'Name must be less than 10 characters'
]

const captchaRule = [
  (v: any) => !!v || 'captcha is required',
];

const getSliderCaptcha = () => {
  if (form.username == '') {
    getSliderCaptchaBtnErrMsg.value = 'username is null';
    return;
  }
  sliderCaptcha.value.getCaptcha();
  sliderCaptchaBoxShow.value = true;
  getSliderCaptchaBtnErrMsg.value = '';
}

const validate = () => {

  if (loginForm.value.validate()) {
    //通过验证后提交数据
    loading.value = true;

    const passwordSha256 = CryptoJS.SHA256(form.username + "&" + form.password).toString(CryptoJS.enc.Hex);

    const salt = genSaltSync(10);
    const bcHash = hashSync(passwordSha256, salt);

    const cryptoJson = {
      username: form.username,
      password: bcHash,
      data: {
        offset: form.captcha
      },
      timestamp: Date.parse(new Date().toString())
    }

    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(cryptoJson), cryptoKey, { iv: cryptoIv });
    const option: UseFetchOptions<ServerResponse<AccessTokenVo>> = {
      method: "put",
      headers: {
        'Secret': ciphertext.toString()
      },
      server: true
    }

    valid.value = false;
    useFetch('/server/api/v1/authentication/captcha/slider', option).then(({ data: response }) => {
      if (response.value?.code == 0) {
        toast.success(response.value!.message);
        localStorage.setItem("token", response.value!.data.token);
        setTimeout(function () {
          navigateTo({ path: '/dashboard' });
        }, 2000);

      } else {
        toast.error(response.value!.message);
        loading.value = false;
        valid.value = true;
      }

    }).catch((error) => {
      toast.error(error);
    });
  }
}

const sliderVerifyEventCallback = (result: number) => {
  sliderCaptchaState.value = "1";
  form.captcha = result;
}

const reset = () => {
  loginForm.value.reset();
}




</script>