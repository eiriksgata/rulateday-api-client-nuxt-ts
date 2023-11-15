<template>
  <v-navigation-drawer v-model="dashboardDrawer" elevation="0" :rail="rail" permanent @click="rail = false">
    <v-list-item title="管理员后台" nav>
      <template v-slot:append>
        <v-btn variant="text" :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'" @click.stop="rail = !rail"></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>
    <v-list v-model="navigationOpen">
      <v-list-item prepend-icon="mdi-home" title="Home" value="home"></v-list-item>
      <v-list-group value="RBAC">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" prepend-icon="mdi-account-circle" title="RBAC">
          </v-list-item>
        </template>
        <v-list-item title="Role" value="role" @click="$router.push('/dashboard/role')"></v-list-item>
        <v-list-item title="Permission" value="permission"></v-list-item>
        <v-list-item title="User" value="user"></v-list-item>



      </v-list-group>
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

const navigationOpen = ref('home');


</script>
