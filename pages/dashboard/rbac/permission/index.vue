<template>
  <v-data-table :headers="headers" :items="desserts" :sort-by="[{ key: 'calories', order: 'asc' }]">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>权限管理</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" variant="flat" rounded="2" class="mb-2" v-bind="props">
              新建权限
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
                    <v-text-field v-model="editedItem.name" label="权限名称" variant="solo-filled"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-select v-model="editedItem.action" label="接口方法" :items="['GET', 'PUT', 'DELETE', 'POST']"
                      variant="solo-filled"></v-select>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-textarea v-model="editedItem.alias" label="接口地址" variant="solo-filled"></v-textarea>
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
import { getPermissions, permissionSave, permissionDelete } from '~/server/routes/permission';

const dialog = ref(false)
const dialogDelete = ref(false)
const headers = ref<any>([
  {
    title: 'ID',
    align: 'start',
    key: 'id'
  },
  { title: '权限名称', key: 'name' },
  { title: '接口地址', key: 'alias' },
  { title: '请求类型', key: 'action' },
  { title: 'Actions', key: 'actions', sortable: false },
])

const desserts = ref<Array<Permission>>([]);

const editedItem = ref<Permission>({
  id: -1,
  name: '',
  alias: '',
  action: 'GET'
})

const defaultItem = ref<Permission>({
  id: -1,
  name: '',
  alias: '',
  action: 'GET'
});

const formTitle = computed(() => {
  return editedItem.value.id === -1 ? '新建权限' : '编辑权限'
})

async function initialize() {
  const result: ServerResponse<Array<Permission>> = await getPermissions();
  desserts.value = result.data;
}

function editItem(item: Permission) {
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}
function deleteItem(item: Permission) {
  editedItem.value = Object.assign({}, item)
  dialogDelete.value = true
}

async function deleteItemConfirm() {
  const result = await permissionDelete(editedItem.value.id);
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
  if (editedItem.value.id <= -1) {
    editedItem.value.id = -1;
    editedItem.value.parentId = -1;
  }
  const result = await permissionSave(editedItem.value);
  close()
  initialize();
}
watch(dialog, val => {
  val || close()
})

watch(dialogDelete, val => {
  val || closeDelete()
})

onMounted(async () => {
  await nextTick();
  initialize();
})
</script>