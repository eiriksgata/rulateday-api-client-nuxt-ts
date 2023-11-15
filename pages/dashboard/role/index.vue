import { Style } from '../../../.nuxt/components';
<template>
  <v-row>
    <v-col cols="3">
      <v-card>
        <v-card-title primary-title>
          角色列表
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-btn color="info" block>增加角色</v-btn>
            </v-col>
            <v-col cols="12">

              <!-- TODO:实现角色列表 -->
              <v-chip class="ma-1" variant="outlined" v-for="item in roles" :title="item.intro">
                {{ item.name }}
              </v-chip>


            </v-col>

          </v-row>


        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="9">
      <v-card>
        <v-card-title primary-title>
          权限列表
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item>
              <div style="display: flex;">
                <v-btn :disabled="true" :color="getChipColor('POST')">POST</v-btn>
                <v-alert color="teal-lighten-5" style="flex: 1;height: 36px;">/roles</v-alert>
              </div>
            </v-list-item>
            <v-list-item>
              <div style="display: flex;">
                <v-btn :disabled="true" :color="getChipColor('POST')">POST</v-btn>
                <v-alert color="teal-lighten-5" style="flex: 1;height: 36px;">/roles</v-alert>
              </div>
            </v-list-item>
            <v-list-item>
              <div style="display: flex;">
                <v-btn :disabled="true" :color="getChipColor('POST')">POST</v-btn>
                <v-alert color="teal-lighten-5" style="flex: 1;height: 36px;">/roles</v-alert>
              </div>
            </v-list-item>
            <v-list-item>
              <div style="display: flex;">
                <v-btn :disabled="true" :color="getChipColor('POST')">POST</v-btn>
                <v-alert color="teal-lighten-5" style="flex: 1;height: 36px;">/roles</v-alert>
              </div>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<style scoped></style>
<script lang="ts" setup>

const roles = [
  {
    "id": 448886027017392128,
    "name": "系统管理员",
    "code": "ADMIN",
    "intro": "拥有所有权限",
    "permissions": null
  },
  {
    "id": 448886093161566208,
    "name": "运维",
    "code": "OPS",
    "intro": "剔除删除权限",
    "permissions": null
  },
  {
    "id": 448886119015256064,
    "name": "游客账号",
    "code": "GUEST",
    "intro": "仅查看权限",
    "permissions": null
  }
];

const getChipColor = (action: string) => {
  switch (action) {
    case 'POST':
      return 'success';
    case 'PUT':
      return 'waring';
    case 'DELETE':
      return 'DELETE';
    case 'GET':
      return 'info';
  }
}


</script>