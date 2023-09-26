<template>
  <v-navigation-drawer v-model="dashboardDrawer" elevation="0" :rail="rail" permanent @click="rail = false">
    <v-list-item title="管理员后台" nav>
      <template v-slot:append>
        <v-btn variant="text" :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'" @click.stop="rail = !rail"></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>
    <v-list>
      <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
      <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
      <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <div>
    <NuxtPage />
  </div>
</template>

<style scoped></style>

<script lang="ts" setup>

const rail = ref(true)
const dashboardDrawer = ref(true);


</script>
