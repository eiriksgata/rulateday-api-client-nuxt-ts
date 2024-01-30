<template>
  <v-card class="ma-2">
    <v-data-iterator :items="roles" :items-per-page="3" :search="search">
      <template v-slot:header>
        <v-toolbar class="px-2">
          <v-text-field v-model="search" clearable density="comfortable" hide-details placeholder="Search"
            prepend-inner-icon="mdi-magnify" style="max-width: 300px;" variant="solo"></v-text-field>

          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn rounded="2" class="text-none" color="indigo-darken-3" variant="flat" v-bind="props">新加角色</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.name" label="角色名称"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.code" label="编码"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.intro" label="简介"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="deleteRoleBtnEvent(editedItem.id || -1)" color="red" variant="flat"
                  v-show="deleteRoleBtnShow">删除该角色</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="close">
                  取消
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="save">
                  保存
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:default="{ items }">
        <v-container class="pa-2" fluid>
          <v-row dense>
            <v-col v-for="item in items" :key="item.raw.id" cols="auto" md="4">
              <v-card class="pb-3" :variant="item.raw.id === currentRoleId ? 'outlined' : 'elevated'">

                <v-list-item class="mb-2" :subtitle="item.raw.intro">
                  <template v-slot:title>
                    <strong class="text-h6 mb-2">{{ item.raw.name }}</strong>
                  </template>
                </v-list-item>

                <div class="d-flex justify-space-between px-4">
                  <div class="d-flex align-center text-caption text-medium-emphasis me-1">
                    <v-icon icon="mdi-code-block-tags" start></v-icon>
                    <div class="text-truncate">{{ item.raw.code }}</div>
                  </div>
                  <div>
                    <v-btn border flat size="small" class="text-none" text="角色编辑" @click="editRoleClickEvent(item.raw)">
                    </v-btn>
                    <v-btn border flat size="small" class="text-none" text="权限编辑"
                      @click="getRolePermissions(item.raw.id)">
                    </v-btn>
                  </div>
                </div>


              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
        <div class="d-flex align-center justify-center pa-4">
          <v-btn :disabled="page === 1" icon="mdi-arrow-left" density="comfortable" variant="tonal" rounded
            @click="prevPage"></v-btn>

          <div class="mx-2 text-caption">
            Page {{ page }} of {{ pageCount }}
          </div>

          <v-btn :disabled="page >= pageCount" icon="mdi-arrow-right" density="comfortable" variant="tonal" rounded
            @click="nextPage"></v-btn>
        </div>
      </template>
    </v-data-iterator>
  </v-card>


  <v-data-table :headers="headers" :items="desserts" :sort-by="[{ key: 'id', order: 'asc' }]" v-model="rolePermission"
    item-value="id" show-select :search="permissionSearch">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>角色权限管理</v-toolbar-title>
        <v-text-field v-model="permissionSearch" clearable density="comfortable" hide-details placeholder="权限搜素"
          prepend-inner-icon="mdi-magnify" style="max-width: 300px;" variant="solo"></v-text-field>

        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn color="primary" variant="outlined" @click="rolePermissionBtnSaveEvent">保存权限</v-btn>
      </v-toolbar>
    </template>
  </v-data-table>
</template>
<style scoped></style>
<script lang="ts" setup>
import { getRoles, getRolePermissionByRoleId, saveRole, deleteRole, rolePermissionsSave } from '~/server/api/role';
import { ref, nextTick } from 'vue';
import { getPermissions } from '~/server/api/permission';

const roles = ref<Array<Role>>(new Array<Role>());

const rolePermission = ref<Array<Number>>(new Array<Number>());

const desserts = ref(new Array<Permission>());

const dialog = ref(false);

const search = ref('');

const permissionSearch = ref('');

const currentRoleId = ref(-1);

const headers = ref<any>([
  {
    title: 'ID',
    align: 'start',
    key: 'id'
  },
  { title: '权限名称', key: 'name' },
  { title: '接口地址', key: 'alias' },
  { title: '请求类型', key: 'action' }
])

const editedItem = ref<Role>({
  id: -1,
  name: '',
  intro: '',
  code: ''
})

const defaultItem = ref<Role>({
  id: -1,
  name: '',
  intro: '',
  code: ''
})

const formTitle = computed(() => {
  return editedItem.value.id === -1 ? '新建角色' : '编辑角色'
});

const deleteRoleBtnShow = computed(() => {
  return editedItem.value.id !== -1;
})

const getRoleList = async () => {
  await nextTick();
  const result: ServerResponse<Array<Role>> = await getRoles();
  roles.value = result.data;
}

const getRolePermissions = async (id: number) => {
  await nextTick();
  const result: ServerResponse<Role> = await getRolePermissionByRoleId(id);
  const filterList = new Array<Number>();
  result.data.permissions?.forEach(function (value: Permission) {
    filterList.push(value.id);
  });
  currentRoleId.value = id;
  rolePermission.value = filterList;
}

function close() {
  dialog.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value)
    editedItem.value.id = -1
  })
}

async function save() {
  const result: ServerResponse<Object> = await saveRole(editedItem.value);
  getRoleList();
  close()
}

watch(dialog, val => {
  val || close()
})

onMounted(async () => {
  await nextTick();
  await getRoleList();
  await loadAllPermissions();
});

async function loadAllPermissions() {
  nextTick();
  desserts.value = (await getPermissions()).data;


}

function editRoleClickEvent(item: Role) {
  editedItem.value = item;
  dialog.value = true;
}

async function deleteRoleBtnEvent(id: number) {
  if (id === -1) return;
  await nextTick();
  const result = await deleteRole(id);
  getRoleList();
  close();
}

async function rolePermissionBtnSaveEvent() {
  const result = await rolePermissionsSave({
    roleId: currentRoleId.value,
    permissions: rolePermission.value
  });
  getRolePermissionByRoleId(currentRoleId.value);
}


</script>