<template>
  <v-layout>
    <v-navigation-drawer v-model="dashboardDrawer" :rail="rail" @click="rail = false">
      <v-list-item title="Control Backend" nav>
        <template v-slot:append>
          <v-btn variant="text" :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
            @click.stop="rail = !rail"></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-monitor-dashboard" title="Home" value="home" @click="$router.push('/dashboard/home')"></v-list-item>
        <v-list-group value="RBAC" v-show="accountInfo.sub === 'admin'">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" prepend-icon="mdi-microsoft-access" title="RBAC">
            </v-list-item>
          </template>
          <v-list-item title="Role" value="role" @click="$router.push('/dashboard/rbac/role')"></v-list-item>
          <v-list-item title="Permission" value="permission"
            @click="$router.push('/dashboard/rbac/permission')"></v-list-item>
          <v-list-item title="User" value="user" @click="$router.push('/dashboard/rbac/user')"></v-list-item>
        </v-list-group>

        <v-list-group value="Personnel">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" prepend-icon="mdi-account-box-outline" title="账号管理">
            </v-list-item>
          </template>
          <v-list-item title="凭证管理" value="passwordReset"
            @click="$router.push('/dashboard/personnel/account')"></v-list-item>
        </v-list-group>

        <v-list-item prepend-icon="mdi-robot" title="机器人"  @click="$router.push('/dashboard/robot')"></v-list-item>
        
        <v-list-item prepend-icon="mdi-lock-check-outline" title="弹幕工具授权"  @click="$router.push('/dashboard/eirctool')"></v-list-item>
        

      </v-list>
    </v-navigation-drawer>

    <!-- <v-navigation-drawer v-model="drawer" temporary location="right">
      <v-list-item prepend-avatar="/images/person-null.jpg" :title="accountInfo.sub"></v-list-item>
      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-newspaper-variant-outline" title="新闻" value="news"></v-list-item>

        <v-list-item prepend-icon="mdi-account-circle-outline" title="个人信息" value="userInfo"></v-list-item>

        <v-list-item prepend-icon="mdi-shield-account-outline" title="账号设置" value="account"></v-list-item>

        <v-list-item prepend-icon="mdi-message-alert-outline" title="消息" value="message"></v-list-item>
      </v-list>

      <v-divider></v-divider>
      <v-list-item link prepend-icon="mdi-logout" title="Logout" value="logout"></v-list-item>
    </v-navigation-drawer> -->

    <v-app-bar prominent elevation="1">
      <v-spacer></v-spacer>
      <v-btn class="mr-2" v-if="adminBtn" variant="outlined" color="waring"
        @click="$router.push('/dashboard/home')">Backend</v-btn>

      <v-btn class="mr-2" v-if="accountInfo.sub === ''" variant="outlined" color="info">登陆</v-btn>

      <v-btn class="mr-2" @Click="clickUserInfo" v-if="accountInfo.sub !== ''" variant="outlined" color="info"
        prepend-icon="mdi-account-circle"><template v-slot:prepend>
          <v-icon color="info"></v-icon>
        </template>{{ accountInfo.sub }}</v-btn>

    </v-app-bar>

    <v-main>
      <NuxtPage />
    </v-main>

  </v-layout>
</template>

<style scoped></style>

<script lang="ts" setup>


const rail = ref(false)
const dashboardDrawer = ref(true);

const navigationOpen = ref('home');


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
