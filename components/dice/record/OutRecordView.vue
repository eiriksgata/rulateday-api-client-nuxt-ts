
<template>
  <v-card>
    <v-tabs v-model="tabsTextFrameDataName">
      <v-tab value="textTab">Text</v-tab>
      <v-tab value="contentTab">Content风格</v-tab>
      <v-tab value="sourceTab">Source</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tabsTextFrameDataName">

        <v-window-item value="textTab">
          <v-card color="basil">
            <v-textarea counter solo label="解析内容" rows="18"
              :model-value="recordOut.chatMessageRecordHandlerResult"></v-textarea>

          </v-card>
        </v-window-item>

        <v-window-item value="contentTab">
          <div ref="imageDom">
           
              <v-list lines="three">


                <v-list-item v-for="(item, index) in recordOut.contentStyleData" :key="index">

                  <template v-slot:prepend>
                    <v-avatar class="me-4 mt-2" rounded="0">
                      <v-img :src="item.prependAvatar" cover></v-img>
                    </v-avatar>
                  </template>
                  <v-list-item-title contenteditable="true" class="text-uppercase font-weight-regular text-caption" v-text="item.title">
                  </v-list-item-title>

                  <div v-text="item.subtitle" contenteditable="true"></div>

                </v-list-item>

              </v-list>
         
          </div>
        </v-window-item>

        <v-window-item value="sourceTab">
          <v-card color="basil" flat>

            <v-textarea counter solo label="源文件数据格式化" :model-value="recordOut.textContextSource" rows="18"></v-textarea>

          </v-card>
        </v-window-item>

      </v-window>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { useRecordOut } from '../../../stores/out-record-data';


const recordOut = useRecordOut();

const tabsTextFrameDataName = ref('textTab');


</script>