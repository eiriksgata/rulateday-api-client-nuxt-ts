<template>
  <v-app>
    <v-app-bar>

      <v-btn prepend-icon="mdi-home" style="margin-left: 50px;" @click="$router.push('/')">
        <template v-slot:prepend>
          <v-icon color=""></v-icon>
        </template>
        工具主页
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="info">登陆</v-btn>
    </v-app-bar>
    <v-main style="background-color: #bbe6d6">

      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
</script>
