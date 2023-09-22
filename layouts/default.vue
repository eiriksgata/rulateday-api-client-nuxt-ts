<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" temporary location="right">
      <v-list-item prepend-avatar="/images/person-null.jpg" :title="accountInfo.sub"></v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-newspaper-variant-outline" title="新闻" value="news"></v-list-item>

        <v-list-item prepend-icon="mdi-account-circle-outline" title="个人信息" value="userInfo"></v-list-item>

        <v-list-item prepend-icon="mdi-shield-account-outline" title="账号设置" value="account"></v-list-item>

        <v-list-item prepend-icon="mdi-message-alert-outline" title="消息" value="message"></v-list-item>

        <v-divider></v-divider>
        <v-list-item prepend-icon="mdi-logout" title="Logout" value="logout"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-btn prepend-icon="mdi-home" style="margin-left: 50px;" @click="$router.push('/')">
        <template v-slot:prepend>
          <v-icon color=""></v-icon>
        </template>
        工具主页
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn class="mr-2" v-if="adminBtn" variant="outlined" color="waring">管理员后台</v-btn>

      <v-btn class="mr-2" v-if="accountInfo.sub === ''" variant="outlined" color="info">登陆</v-btn>

      <v-btn class="mr-2" @Click="clickUserInfo" v-if="accountInfo.sub !== ''" variant="outlined" color="info"
        prepend-icon="mdi-account-circle"><template v-slot:prepend>
          <v-icon color="info"></v-icon>
        </template>{{ accountInfo.sub }}</v-btn>

    </v-app-bar>

    <v-main style="background-color: #bbe6d6">

      <slot />
    </v-main>

  </v-app>
</template>

<script lang="ts" setup>
type TokenPayload = {
  exp: number
  iat: number
  iss: string
  sub: string
  roles: Array<string>
}

const accountInfo = ref({
  exp: -1,
  iat: -1,
  iss: '',
  sub: '',
  roles: new Array<string>()
} as TokenPayload);

const drawer = ref(false);
const adminBtn = ref(false);

function clickUserInfo() {
  if (drawer.value) {
    drawer.value = false;
  } else {
    drawer.value = true;
  }
}
onMounted(() => {
  const jwt = localStorage.getItem('token');
  if (jwt == null || jwt == undefined) {
    return;
  }
  const base64Json = localStorage.getItem('token')!.split('.')[1];
  const decodeJson = decodeURI((atob(base64Json)));
  accountInfo.value = JSON.parse(decodeJson);
  if (accountInfo.value.roles.includes('ADMIN')) {
    adminBtn.value = true;
  }
});

</script>
