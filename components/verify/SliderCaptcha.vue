
<template>
  <div ref="sliderVerifyCard" class="verify-slider-captcha">
    <v-card :loading="sliderLoading">
      <v-img ref="backgroundPictureImg" :src="captchaImage">
        <v-img :style="`position: absolute;top: ${sliderImageTop}px;left:${sliderImageLeft}px`" :src="sliderImage"
          :width="`${sliderImageWidth}%`"></v-img>
      </v-img>
      <v-slider :readonly="sliderCaptchaReadonly" v-model="sliderX" track-color="grey" min="0" :max="sliderXMax" :step="1"
        @end="sliderEndEvent"></v-slider>
    </v-card>
  </div>
</template>
<style scope>
.verify-slider-captcha {
  position: relative;
}

@keyframes shake {
  0% {
    left: 5px;
  }

  20% {
    left: -5px;
  }

  40% {
    left: 5px;
  }

  60% {
    left: -5px;
  }

  80% {
    left: 5px;
  }

  100% {
    left: 0px;
  }
}
</style>

<script lang="ts" setup>
import type { UseFetchOptions } from 'nuxt/app';
import { toast } from 'vue3-toastify';


const emit = defineEmits<{
  verifyCallback: [result: number]
}>();

type SliderCaptchaVo = {
  slider: string,
  background: string,
  y: number,
  width: number,
  height: number
}
const props = defineProps(['username']);
const sliderVerifyCard = ref()

const captchaImage = ref('/images/material.jpg');
const sliderImage = ref('');
const sliderImageWidth = ref(50);
const sliderImageTop = ref(0);
const sliderXMax = ref(250);

const sliderImageLeft = ref(0)
const pictureWidthMagnification = ref(0);
const sliderX = ref(0);

const backgroundPictureImg = ref(null);

const sliderLoading = ref(false);
const sliderCaptchaReadonly = ref(false);

const getCaptcha = () => {
  sliderX.value = 0;
  sliderLoading.value = true;
  sliderCaptchaReadonly.value = true;
  if (props.username == null || props.username == '') {
    return;
  }
  const option: UseFetchOptions<ServerResponse<SliderCaptchaVo>> = {
    method: "get",
    server: true
  }
  useFetch(`/server/api/v1/generate/slider/captcha/${props.username}`, option).then(({ data: response }) => {
    if (response.value?.code == 0) {
      const picture = "data:image/temp;base64," + response.value.data.background;
      captchaImage.value = picture;
      console.log(response.value.data);
      sliderXMax.value = response.value.data.width;
      sliderImage.value = "data:image/temp;base64," + response.value.data.slider;
      if (backgroundPictureImg == null) {
        return;
      }
      const backgroundWidth = (backgroundPictureImg as any).value.image.width;
      const backgroundHeight = (backgroundPictureImg as any).value.image.height;

      const magnification = backgroundWidth / response.value.data.width;
      const heightMagnification = backgroundHeight / response.value.data.height;

      sliderImageWidth.value = ((magnification * 100) - 3);
      sliderImageTop.value = heightMagnification * response.value.data.y;

      pictureWidthMagnification.value = magnification;

      sliderLoading.value = false;
      sliderCaptchaReadonly.value = false;
    } else {
      toast.error(response.value!.message);
    }

  }).catch((error) => {
    toast.error(error);
  });
}


const sliderEndEvent = () => {
  if (sliderX.value == 0 || sliderX.value == null) {
    return;
  }
  sliderLoading.value = true;
  sliderCaptchaReadonly.value = true;
  const option: UseFetchOptions<ServerResponse<null>> = {
    method: 'post',
    server: true,
    body: {
      username: props.username,
      offset: sliderX.value
    }
  }
  useFetch('/server/api/v1/slider/captcha/verify', option).then(({ data: response }) => {
    if (response.value?.code == 0) {
      emit('verifyCallback', sliderX.value);
      sliderLoading.value = false;
    } else {
      sliderX.value = 0;
      sliderVerifyCard.value.style.animation = 'shake 0.5s';
      const timer = setTimeout(function () {
        sliderVerifyCard.value.style.animation = '';
        clearTimeout(timer);
      }, 500);
      getCaptcha();
    }
  })
}



watch(sliderX, () => {
  sliderImageLeft.value = sliderX.value * pictureWidthMagnification.value;
})

defineExpose({
  getCaptcha
});
</script>