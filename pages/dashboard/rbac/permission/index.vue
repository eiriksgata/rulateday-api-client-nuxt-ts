<template>
  <v-row :dense="true">
    <v-col md="4" sm="12" xs="12" class="pa-0">
      <v-card class="ma-2">
        <v-card-title primary-title>
          角色列表
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-btn color="info" width="150">增加角色</v-btn>
            </v-col>
            <v-divider :thickness="3"></v-divider>
            <v-col cols="12">

              <!-- TODO:实现角色列表 -->
              <v-chip class="ma-1" variant="outlined" v-for="item in roles" :title="item.intro"
                @click="getRolePermissions(item.id!)">
                {{ item.name }}
              </v-chip>

            </v-col>

          </v-row>


        </v-card-text>
      </v-card>
    </v-col>
    <v-col md="8" sm="12" xs="12" class="pa-0">
      <v-card class="ma-2">
        <v-card-title primary-title>
          权限列表
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item v-for="permission in rolePermission" v-show="permission.action !== ''">
              <div style="display: flex;">
                <v-btn :color="getChipColor(permission.action)">{{ permission.name }} | {{ permission.action }}</v-btn>
                <v-alert class="text-truncate" color="teal-lighten-5" style="flex: 1;height: 36px;">
                  {{ permission.alias }}}
                </v-alert>
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
import { getRoles, getRolePermissionByRoleId } from '~/server/api/role';

const roles = ref(new Array<Role>());

const rolePermission = ref(new Array<Permission>())

const getRoleList = async () => {
  await nextTick();
  const result: ServerResponse<Array<Role>> = await getRoles();
  roles.value = result.data;
}

const getRolePermissions = async (id: number) => {
  await nextTick();
  console.log(id);
  const result: ServerResponse<Role> = await getRolePermissionByRoleId(id);
  rolePermission.value = result.data.permissions || [];
}

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

onMounted(() => {
  getRoleList();

});


</script>