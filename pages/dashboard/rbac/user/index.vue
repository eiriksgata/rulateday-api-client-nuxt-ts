<template>
  <v-data-table :headers="headers" :items="desserts" :sort-by="[{ key: 'calories', order: 'asc' }]">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>用户管理</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" variant="flat" rounded="2" class="mb-2" v-bind="props">
              新建用户
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field :disabled="editedItem.id !== -1" v-model="editedItem.name" label="用户名"
                      variant="solo-filled"></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="12" md="12" v-show="editedItem.id == -1">
                    <v-text-field type="password" v-model="editedItem.pwd" label="密码"
                      variant="solo-filled"></v-text-field>
                  </v-col>

                  <v-col cols="6" sm="6" md="6">
                    <v-switch color="primary" v-model="editedItem.isExpired" label="账号过期"></v-switch>
                  </v-col>

                  <v-col cols="6" sm="6" md="6">
                    <v-switch color="primary" v-model="editedItem.isLocked" label="账号冻结"></v-switch>

                  </v-col>

                  <v-col cols="6" sm="6" md="6">
                    <v-switch color="primary" v-model="editedItem.isPasswdExpired" label="密码过期"></v-switch>
                  </v-col>

                  <v-col cols="6" sm="6" md="6">
                    <v-select multiple chips v-model="editedItem.roles" label="角色" :items="roleItems" item-title="name"
                      item-value="id" variant="solo-filled"></v-select>
                  </v-col>


                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>

    <template v-slot:item.type="{ item }">
      {{ accessTypeText(item.type) }}
    </template>

    <template v-slot:item.createdAt="{ item }">
      {{ Moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
    </template>

    <template v-slot:item.updatedAt="{ item }">
      {{ Moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss") }}
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>


<style scoped></style>
<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue'
import { getUsers, userSave, userDelete, userUpdate } from '~/server/routes/user';
import Moment from 'moment';
import { getRoles } from '~/server/routes/role';
import CryptoJS from 'crypto-js';


const dialog = ref(false)
const dialogDelete = ref(false)
const headers = ref<any>([
  {
    title: 'ID',
    align: 'start',
    key: 'id'
  },
  { title: '账号', key: 'name' },
  { title: '账号类型', key: 'type' },
  { title: '账号过期', key: 'isExpired' },
  { title: '账号冻结', key: 'isLocked' },
  { title: '密码过期', key: 'isPasswdExpired' },
  { title: '创建时间', key: 'createdAt' },
  { title: '更新时间', key: 'updatedAt' },
  { title: 'Actions', key: 'actions', sortable: false },
])

const desserts = ref<Array<User>>([]);

const roleItems = ref<Array<Role>>();

const editedItem = ref<User>({
  id: -1,
  name: '',
  type: 2,
  isExpired: false,
  isLocked: false,
  isPasswdExpired: false,
  createdAt: new Date(),
  updatedAt: new Date()
})

const defaultItem = ref<User>({
  id: -1,
  name: '',
  type: 1,
  isExpired: false,
  isLocked: false,
  isPasswdExpired: false,
  createdAt: new Date(),
  updatedAt: new Date()
});

const formTitle = computed(() => {
  return editedItem.value.id === -1 ? '新建用户' : '编辑用户'
})

async function initialize() {
  const result: ServerResponse<Array<User>> = await getUsers();
  desserts.value = result.data;
}

function editItem(item: User) {
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}

function deleteItem(item: User) {
  editedItem.value = Object.assign({}, item)
  dialogDelete.value = true
}

async function deleteItemConfirm() {
  const result = await userDelete(editedItem.value.id);
  initialize();
  closeDelete()
}

function close() {
  dialog.value = false
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value)
    editedItem.value.id = -1
  })
}

function closeDelete() {
  dialogDelete.value = false
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value)
    editedItem.value.id = -1
  })
}

async function save() {
  if (editedItem.value.id == -1) {
    const passwordSha256 = CryptoJS.SHA256(editedItem.value.name + "&" + editedItem.value.pwd).toString(CryptoJS.enc.Hex);
    editedItem.value.pwd = passwordSha256;
    const result = await userSave(editedItem.value);
  } else {
    const result = await userUpdate(editedItem.value);
  }
  initialize();
  close()
  editedItem.value.pwd = '';
}
watch(dialog, val => {
  val || close()
})

watch(dialogDelete, val => {
  val || closeDelete()
})

function accessTypeText(value: number): string {
  switch (value) {
    case 1:
      return '管理员'
    case 2:
      return '运维'
    case 3:
      return '访客'
  }
  return '未知'
}

onMounted(async () => {
  await nextTick();
  initialize();
  roleItems.value = (await getRoles()).data;
})

</script>