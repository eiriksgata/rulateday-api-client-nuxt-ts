<template>
  <v-card>
    <v-card-title>
      文件信息
    </v-card-title>
    <v-card-text>
      <v-file-input show-size v-model="selectFiles" counter multiple outlined accept=".json" @change="changeFile()"
        label="选择记录文件"></v-file-input>
      <v-row>
        <v-col cols="6">
          <v-switch :hide-details="false" dense v-model="switchButton.showSenderId" label="显示发送人ID"
            color="indigo darken-3"></v-switch>
        </v-col>
        <v-col cols="6">
          <v-switch :hide-details="false" dense v-model="switchButton.showDate" label="显示发送时间"
            color="indigo darken-3"></v-switch>
        </v-col>

        <v-col cols="6">
          <v-btn @click="getFormatSourceJsonText()">格式化源文件</v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn @click="contentStyleFrameRecordTextHandler()">渲染Context风格</v-btn>
        </v-col>

        <v-col cols="6"> 群名称： {{ recordData.groupName }} </v-col>
        <v-col cols="6"> 群ID： {{ recordData.groupId }} </v-col>
        <v-col cols="6"> 创建时间： {{ recordData.createdAt }} </v-col>
        <v-col cols="6">
          创建人ID： {{ recordData.createdById }}
        </v-col>
        <v-col cols="6"> 消息数量： {{ recordInfo.recordSize }} </v-col>
        <v-col cols="6">
          参与人员数量： {{ recordInfo.senderSize }}
        </v-col>

        <v-col cols="12">
          <div>人员列表：</div>

          <v-item-group mandatory>
            <div class="sender-list-item-box" :key="key" v-for="(value, key) in senderMap">
              <v-item v-slot="{ isSelected, toggle }">
                <v-card elevation="5" :color="isSelected ? 'primary' : ''" @click="
                                                                                                                                                                                                                  if (toggle) toggle();
                  selectChangePictureSender(value[0]);
                  ">
                  <v-img :src="senderPicture.get(value[0])"></v-img>
                  <div class="text-center">{{ value[1] }}</div>
                </v-card>
              </v-item>
            </div>
          </v-item-group>
        </v-col>

        <v-col cols="12">
          <v-file-input v-if="senderMap.size != 0" v-model="selectChangeSenderPictureFiles" outlined accept="image/*"
            @change="changeSenderPictureFile()" label="选择更换头像文件"></v-file-input>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
.sender-list-item-box {
  width: 100px;
  min-height: 100px;
  float: left;
  margin: 10px;
}
</style>

<script setup lang="ts">
import prettier from 'prettier/standalone';
import { ref, reactive } from 'vue';
import { ChatRecordData, Records, contentStyleData } from './file-info.component.module'
import { toast } from 'vue3-toastify';

const selectFiles = ref(new Array<File>);
const selectChangeSenderPictureFiles = ref(new Array<File>);

const senderMap = reactive(new Map());
const senderPicture = reactive(new Map());

let currentSelectChangePictureSenderId = ref(0);
let contentStyleData = ref(new Array<contentStyleData>());
let recordData = ref({} as ChatRecordData);
let chatMessageRecordHandlerResult = ref('');

const textContext = reactive({
  source: ''
});
const recordInfo = reactive({
  recordSize: 0,
  senderSize: 0
});
const switchButton = reactive({
  showSenderId: true,
  showDate: true
})

const changeFile = (): void => {
  const reader = new FileReader();
  reader.onload = function (ev: ProgressEvent<FileReader>) {
    if (ev.target && ev.target.result && typeof ev.target.result === 'string') {
      recordData.value = JSON.parse(ev.target.result);
      chatRecordTextViewHandler();
    }
  }
  reader.readAsText(selectFiles.value[0]);
}

const getFormatSourceJsonText = (): void => {
  prettier.format(JSON.stringify(recordData.value), {
    parser: "json",
    endOfLine: 'auto'
  }).then((value: string) => {
    textContext.source = value;
  });
}

const contentStyleFrameRecordTextHandler = (): void => {
  contentStyleData.value.length = 0;
  recordData.value.records.map((value: Records, index: number) => {
    contentStyleData.value.push({
      avatar: senderPicture.get(value.senderId),
      title: value.senderName,
      content: value.content
    });
  });
}

const changeSenderPictureFile = (): void => {
  if (currentSelectChangePictureSenderId.value == 0) {
    //TODO 
    toast.error('未选定人员');
    return;
  }
  const reader = new FileReader();
  reader.onload = function (ev: ProgressEvent<FileReader>) {
    if (ev.target && ev.target.result && typeof ev.target.result === 'string') {
      senderPicture.set(currentSelectChangePictureSenderId.value, ev.target.result);
    }
  }
  reader.readAsDataURL(selectChangeSenderPictureFiles.value[0]);
}

const chatRecordTextViewHandler = (): void => {
  let result = '';
  recordData.value.records.map((value: Records, index: number) => {
    if (senderMap.get(value.senderId) === undefined) {
      senderMap.set(value.senderId, value.senderName);
      senderPicture.set(value.senderId, `../../images/profile/${index}.svg`);
    }
    result += `${value.senderName}`;
    if (switchButton.showSenderId) {
      result += ` (${value.senderId})`;
    }
    if (switchButton.showDate) {
      result += ` ${value.date}`;
    }
    result += "\n";
    result += `${value.content} \n\n`
  });
  recordInfo.recordSize = recordData.value.records.length;
  recordInfo.senderSize = senderMap.size;
  chatMessageRecordHandlerResult.value = result;
}

const selectChangePictureSender = (id: number): void => {
  currentSelectChangePictureSenderId.value = id;
}
</script>