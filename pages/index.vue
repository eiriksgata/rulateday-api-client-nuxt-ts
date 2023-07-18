<template>
  <div>
    <v-app>
      <!-- APP BAR -->
      <v-app-bar app>

        <v-btn prepend-icon="mdi-home" style="margin-left: 50px;">
          <template v-slot:prepend>
            <v-icon color=""></v-icon>
          </template>
          工具主页

        </v-btn>

        <v-spacer></v-spacer>
        <v-btn color="info">登陆</v-btn>


      </v-app-bar>

      <v-main>
        <v-container grid-list-xs>
          <NavigationTool />
        </v-container>
      </v-main>

    </v-app>
  </div>
</template>

<style lang="sass" scoped>
</style>

<script setup lang="ts">

</script>
