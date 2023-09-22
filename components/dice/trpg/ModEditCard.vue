<template>
  <v-card>
    <v-card-text>
      <v-tabs v-model="tabsData.name">
        <v-tab>模组基础信息</v-tab>
        <v-tab>角色数据</v-tab>
        <v-tab>事件</v-tab>
        <v-tab>选项</v-tab>
      </v-tabs>

      <v-window v-model="tabsData.name">
        <v-window-item key="0">
          <v-row>
            <v-col cols="12">
              <v-file-input show-size v-model="trpgModelFile" counter multiple accept=".json"
                @change="ChangeTrpgModelFile()" label="选择模组文件"></v-file-input>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <v-text-field :hide-details="true" v-model="trpgModelData.name" :counter="20" label="模组名称"></v-text-field>
            </v-col>

            <v-col cols="6" md="6" sm="6">
              <v-text-field :hide-details="true" v-model="trpgModelData.author" :counter="20" label="模组作者"></v-text-field>
            </v-col>

            <v-col cols="6" md="6" sm="6">
              <v-text-field :hide-details="true" v-model="trpgModelData.version" :counter="20"
                label="模组版本"></v-text-field>
            </v-col>

            <v-col cols="12" md="12" sm="12">
              <v-textarea :hide-details="true" :model-value="trpgModelData.describe" rows="4" label="模组描述"></v-textarea>
            </v-col>

            <v-col cols="12" md="12" sm="12">
              <v-textarea :hide-details="true" :model-value="trpgModelData.introduction" rows="6" label="简介"></v-textarea>
            </v-col>
          </v-row>
        </v-window-item>

        <v-window-item key="1">
          <v-container v-if="trpgModelData.importData">
            <v-row dense>
              <v-col cols="3">
                <v-text-field ma-5 :hide-details="true" v-model="trpgCardData.addRoleNameBean" label="角色名"></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-container>
                  <v-btn :hide-details="true" color="success" @click="addTrpgRole()">增加角色</v-btn>
                </v-container>
              </v-col>

              <v-col cols="4">
                <v-container>
                  <v-select pa-3 :hide-details="true" dense :items="trpgCardData.roleSelectItems"
                    v-model="trpgCardData.role.name" label="选择角色" solo></v-select>
                </v-container>
              </v-col>

              <v-col cols="12">
                <v-card color="#385F73" theme="dark">
                  <v-card-title>{{
                    trpgCardData.role.name
                  }}</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12">
                        <v-textarea dense :model-value="trpgCardData.role.describe" rows="3" label="描述"></v-textarea>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea dense :model-value="trpgCardData.role.attribute" rows="3" label="属性"></v-textarea>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea dense :model-value="trpgCardData.role.consumables" rows="3" label="消耗品"></v-textarea>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn @click="deleteRoleData()">删除角色</v-btn>
                    <v-btn @click="saveRoleData()">保存数据</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-window-item>

        <v-window-item key="2">
          <v-row>
            <v-col cols="3">
              <v-container>
                <v-btn @click="addTrpgEvent()">新建事件</v-btn>
              </v-container>
            </v-col>
            <v-col cols="3">
              <v-text-field :hide-details="true" label="事件ID" v-model="trpgCardData.addEventId"></v-text-field>
            </v-col>

            <v-col cols="4">
              <v-container>
                <v-select :hide-details="true" dense :items="trpgCardData.eventSelectItems"
                  v-model="trpgCardData.event.id" label="选择事件" solo></v-select>
              </v-container>
            </v-col>

            <v-col cols="12">
              <v-card color="#757575" theme="dark">
                <v-card-title>事件ID- {{ trpgCardData.event.id }}</v-card-title>
                <v-card-subtitle>
                  <v-textarea :model-value="trpgCardData.event.text" label="事件文本"></v-textarea>
                </v-card-subtitle>
                <v-card-actions>
                  <v-btn variant="outlined" @click="deleteEventData()">删除事件</v-btn>
                  <v-btn variant="outlined" @click="saveTrpgEventData()">保存事件</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="12">
              <v-card color="#546E7A" theme="dark" :loading="trpgCardData.eventOptionLoading">
                <v-card-title>事件选项</v-card-title>
                <v-card-subtitle>
                  <template v-for="item in trpgCardData.event.option" :key="item">
                    <v-card class="event-option-item-style">
                      <v-btn class="event-option-item-style" @click="trpgCardSelectEventOptionButton(item)">{{
                        getEventOptionName(item) }}</v-btn>
                      <v-btn @click="trpgEventDelOptionItem(item)">
                        删除
                      </v-btn>
                    </v-card>
                  </template>
                </v-card-subtitle>
                <v-card-actions>
                  <v-btn @click="trpgEventAddOptionItem()" class="event-option-item-style">添加一个选项</v-btn>
                  <v-select class="event-option-item-style" dense :items="trpgCardData.eventOptionItems"
                    v-model="trpgCardData.eventOption.id" label="选择需要添加的选项" :hide-details="true" solo></v-select>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>

        <v-window-item key="3">
          <v-row>
            <v-col cols="3">
              <v-container>
                <v-btn @click="addOptionData()" color="success">新建选项</v-btn>
              </v-container>
            </v-col>
            <v-col cols="3">
              <v-text-field :hide-details="true" label="选项ID" v-model="trpgCardData.addOptionId"></v-text-field>
            </v-col>

            <v-col cols="4">
              <v-container>
                <v-select dense :items="trpgCardData.eventOptionItems" v-model="trpgCardData.eventOption.id" label="选项ID"
                  :hide-details="true" solo></v-select>
              </v-container>
            </v-col>

            <v-col cols="12">
              <v-card color="#757575" theme="dark">
                <v-card-title>选项ID-
                  {{ trpgCardData.eventOption.id }}</v-card-title>
                <v-card-text>
                  <v-col cols="12">
                    <v-text-field v-model="trpgCardData.eventOption.text" label="选项文本"></v-text-field>
                  </v-col>

                  <v-row>
                    <v-col cols="4">
                      <v-container>
                        <v-select dense :items="trpgCardData.roleSelectItems" v-model="trpgCardData.eventOption.detection.role
                          " label="检定角色" solo :hide-details="true"></v-select>
                      </v-container>
                    </v-col>

                    <v-col cols="4">
                      <v-switch v-model="trpgCardData.eventOption.detection.showDice
                        " label="显示检定结果"></v-switch>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-text-field label="检定属性" v-model="trpgCardData.eventOption.detection.attribute
                        ">
                      </v-text-field>
                    </v-col>

                    <v-col cols="4">
                      <v-text-field label="检定消耗品" v-model="trpgCardData.eventOption.detection.consumables
                        ">
                      </v-text-field>
                    </v-col>

                    <v-col cols="4">
                      <v-text-field label="点击次数" v-model="trpgCardData.eventOption.count">
                      </v-text-field>
                    </v-col>
                  </v-row>

                  <v-card color="success">
                    <v-card-title>检定成功动作</v-card-title>
                    <v-card-text>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field label="检定成功返回文本" v-model="trpgCardData.eventOption.detection.success
                            .text
                            ">
                          </v-text-field>
                        </v-col>

                        <v-col cols="4">
                          <v-select label="跳转到事件" v-model="trpgCardData.eventOption.detection.success
                            .nextNode
                            " :items="trpgCardData.eventSelectItems"></v-select>
                        </v-col>

                        <v-col cols="4">
                          <v-select label="更改角色数据" v-model="trpgCardData.eventOption.detection.success
                            .update.role
                            " :items="trpgCardData.roleSelectItems"></v-select>
                        </v-col>

                        <v-col cols="4">
                          <v-text-field label="更改的消耗品数据" v-model="trpgCardData.eventOption.detection.success
                            .update.consumables
                            "></v-text-field>
                        </v-col>

                        <v-col cols="4">
                          <v-text-field label="更改的属性数据" v-model="trpgCardData.eventOption.detection.success
                            .update.attribute
                            "></v-text-field>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>

                  <v-card color="black">
                    <v-card-title>检定失败动作</v-card-title>
                    <v-card-text>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field label="检定失败返回文本" v-model="trpgCardData.eventOption.detection.fail
                            .text
                            ">
                          </v-text-field>
                        </v-col>

                        <v-col cols="4">
                          <v-select label="跳转到事件" v-model="trpgCardData.eventOption.detection.fail
                            .nextNode
                            " :items="trpgCardData.eventSelectItems"></v-select>
                        </v-col>

                        <v-col cols="4">
                          <v-select label="更改角色数据" v-model="trpgCardData.eventOption.detection.fail
                            .update.role
                            " :items="trpgCardData.roleSelectItems"></v-select>
                        </v-col>

                        <v-col cols="4">
                          <v-text-field label="更改的消耗品数据" v-model="trpgCardData.eventOption.detection.fail
                            .update.consumables
                            "></v-text-field>
                        </v-col>

                        <v-col cols="4">
                          <v-text-field label="更改的属性数据" v-model="trpgCardData.eventOption.detection.fail
                            .update.attribute
                            "></v-text-field>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-card-text>

                <v-card-actions>
                  <v-btn @click="deleteOptionData()">删除选项</v-btn>
                  <v-btn @click="saveOptionData()">保存选项</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<style lang="scss">
.event-option-item-style {
  margin: 5px
}
</style>

<script setup lang="ts">
import { ref, reactive, toRef } from 'vue';
import { toast } from 'vue3-toastify';
import { removeArrayItemByValue } from "@/utils/HexTool";
import { TrpgMod, TrpgModOption, TrpgModImportDataRole, TrpgModEventNode } from './TrpgMod.component.module';

const trpgModelFile = ref([]);
const trpgModelData: TrpgMod = reactive({
  name: '',
  describe: '',
  introduction: '',
  author: '',
  version: '',
  importData: {
    role: {} as TrpgModImportDataRole
  },
  option: {} as TrpgModOption,
  event: {
    node: {} as TrpgModEventNode
  }
});

const tabsData = ref({ name: 0 });

const trpgCardData = reactive({
  roleSelectItems: new Array<string>(),
  role: {
    name: '',
    describe: '',
    attribute: '',
    consumables: ''
  },
  addRoleNameBean: '',
  addEventId: '',
  addOptionId: '',
  eventSelectItems: new Array<String>(),
  event: {
    id: '',
    text: '',
    option: new Array<string>()
  },
  eventOptionItems: new Array<string>(),
  eventOptionLoading: false,
  eventOption: {
    id: '',
    text: '',
    count: 1,
    detection: {
      role: '',
      attribute: '',
      consumables: '',
      showDice: false,
      success: {
        text: '',
        nextNode: '',
        update: {
          role: '',
          attribute: '',
          consumables: ''
        }
      },
      fail: {
        text: '',
        nextNode: '',
        update: {
          role: '',
          attribute: '',
          consumables: ''
        }
      }
    }
  }

});


const ChangeTrpgModelFile = () => {
  const reader = new FileReader();
  reader.onload = function (e: any) {
    jsonDataImportHandler(e.target.result);

    roleItemsHandler();
    eventItemsHandler();
    eventOptionItemsHandler();
  }
  reader.readAsText(trpgModelFile.value[0]);
}


const jsonDataImportHandler = (jsonText: string) => {
  //对json数据进行单独处理
  const jsonObject = reactive(JSON.parse(jsonText));
  Object.keys(trpgModelData).map((value: string) => {
    trpgModelData[value] = jsonObject[value]
  })
}


const roleItemsHandler = () => {
  const tempRoleObject = trpgModelData.importData.role;
  const tempList = [];
  for (const key in tempRoleObject) {
    tempList.push(key);
  }
  trpgCardData.roleSelectItems = tempList;
}

const eventItemsHandler = () => {
  const tempEventObject = trpgModelData.event.node;
  const tempList = [];
  for (const key in tempEventObject) {
    tempList.push(key);
  }
  trpgCardData.eventSelectItems = tempList;
}

const eventOptionItemsHandler = () => {
  const tempEventObject = trpgModelData.option;
  const tempList = [];
  for (const key in tempEventObject) {
    tempList.push(key);
  }
  trpgCardData.eventOptionItems = tempList;
}

const selectRoleNameEvent = (value: string) => {
  const srcRoleData = trpgModelData.importData.role;
  const tempData = {
    name: value,
    describe: srcRoleData[value].describe,
    attribute: srcRoleData[value].attribute,
    consumables: srcRoleData[value].consumables
  }
  trpgCardData.role = tempData;

}

watch(() => trpgCardData.role.name, (name: string) => {
  selectRoleNameEvent(name);
});

watch(() => trpgCardData.event.id, (id: string) => {
  selectEventId(id);
})

watch(() => trpgCardData.eventOption.id, (id: string) => {
  selectEventOptionId(id);
})

const selectEventId = (eventId: string) => {
  const srcEventNodeData = trpgModelData.event.node;
  const tempData = {
    id: eventId,
    text: srcEventNodeData[eventId].text,
    option: srcEventNodeData[eventId].option
  }
  trpgCardData.event = tempData;
}

const selectEventOptionId = (optionId: string) => {
  const srcEventNodeData = trpgModelData.option;
  const tempData = {
    id: optionId,
    text: srcEventNodeData[optionId].text,
    count: srcEventNodeData[optionId].count,
    detection: srcEventNodeData[optionId].detection
  }
  trpgCardData.eventOption = tempData;
}

const addTrpgRole = () => {
  const tempSaveRoleData = {
    name: trpgCardData.addRoleNameBean,
    describe: '',
    attribute: '',
    consumables: ''
  }
  trpgModelData.importData.role[trpgCardData.addRoleNameBean] = tempSaveRoleData;
  roleItemsHandler();
  trpgCardData.role.name = trpgCardData.addRoleNameBean;

  toast.success('已增加新角色:' + trpgCardData.addRoleNameBean);
}

const saveRoleData = () => {
  const tempSaveRoleData = {
    name: trpgCardData.role.name,
    describe: trpgCardData.role.describe,
    attribute: trpgCardData.role.attribute,
    consumables: trpgCardData.role.consumables
  }
  trpgModelData.importData.role[trpgCardData.role.name] = tempSaveRoleData;
  toast.success('保存角色数据成功');
}

const addTrpgEvent = () => {
  const tempSaveData = {
    text: '',
    option: []
  };

  trpgModelData.event.node[trpgCardData.addEventId] = tempSaveData;
  trpgCardData.event.id = trpgCardData.addEventId;
  toast.success('已增加新事件，请继续填充内容');
  eventItemsHandler();
}


const saveTrpgEventData = () => {
  const tempSaveData = {
    text: trpgCardData.event.text,
    option: trpgCardData.event.option
  };
  trpgModelData.event.node[trpgCardData.event.id] = tempSaveData;
  toast.success('保存数据成功');
}

const trpgEventAddOptionItem = () => {
  trpgModelData.event.node[trpgCardData.event.id]!.option.push(trpgCardData.eventOption.id);
}

const trpgEventDelOptionItem = (optionId: string) => {
  trpgModelData.event.node[trpgCardData.event.id]!.option = removeArrayItemByValue(trpgModelData.event.node[trpgCardData.event.id]!.option, optionId);
}


const deleteRoleData = () => {
  delete trpgModelData.importData.role[trpgCardData.role.name];
  roleItemsHandler();
  toast.success('删除角色成功');
}


const deleteEventData = () => {
  delete trpgModelData.event.node[trpgCardData.event.id];
  eventItemsHandler();
  toast.success('删除事件成功');
}

const getEventOptionName = (optionId: string) => {
  const srcOptionData = trpgModelData.option;
  const optionText = srcOptionData[optionId].text;
  return `[${optionId}] - ${optionText}`;
}

const trpgCardSelectEventOptionButton = (optionId: string) => {
  tabsData.value.name = 3;
  trpgCardData.eventOption.id = optionId;
}

const saveOptionData = () => {
  const tempOption = {
    text: trpgCardData.eventOption.text,
    count: trpgCardData.eventOption.count,
    detection: trpgCardData.eventOption.detection
  };

  trpgModelData.option[trpgCardData.eventOption.id] = tempOption;
  toast.success('已保存选项');
}

const addOptionData = () => {
  const newOption = {
    text: '',
    count: 1,
    detection: {
      role: '',
      attribute: '',
      consumables: '',
      showDice: false,
      success: {
        text: '',
        nextNode: '',
        update: {
          role: '',
          attribute: '',
          consumables: ''
        }
      },
      fail: {
        text: '',
        nextNode: '',
        update: {
          role: '',
          attribute: '',
          consumables: ''
        }
      }
    }
  };

  trpgModelData.option[trpgCardData.addOptionId] = newOption;
  eventOptionItemsHandler();

  trpgCardData.eventOption.id = trpgCardData.addOptionId;
  toast.success('已增加新选项，请继续填充内容');
}

const deleteOptionData = () => {
  delete trpgModelData.option[trpgCardData.eventOption.id];
  eventOptionItemsHandler();
  toast.success('删除选项成功');
}

const strMapToObj = (strMap: any) => {
  let obj = Object.create(null);
  for (let [k, v] of strMap) {
    // We don’t escape the key '__proto__'
    // which can cause problems on older engines
    obj[k] = v;
  }
  return obj;
}

const exportTrpgModelFile = () => {

  const blob = new Blob([JSON.stringify(trpgModelData)], { type: 'application/json' });

  const url = window.URL.createObjectURL(blob)
  // 上面这个是创建一个blob的对象连链接，
  const link = document.createElement('a')
  // 创建一个链接元素，是属于 a 标签的链接元素，所以括号里才是a，

  link.href = url;
  // 把上面获得的blob的对象链接赋值给新创建的这个 a 链接
  link.setAttribute('download', trpgModelData.name + "v" + trpgModelData.version + ".json")
  // 设置下载的属性（所以使用的是download），这个是a 标签的一个属性
  // 后面的是文件名字，可以更改
  link.click();
}


//暴露方法
defineExpose({
  exportTrpgModelFile
});

</script>