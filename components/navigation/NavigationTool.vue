<template>
  <v-row dense>

    <v-col cols="12" md="4" sm="4" xl="3">
      <v-card hover prepend-icon="mdi-message-bulleted" @click="$router.push('/tools/dice/record')">
        <template v-slot:title>
          聊天记录处理工具
        </template>

        <v-card-text>
          用于渲染和处理使用mirai-rulateday-dice插件生成的日志文件。文件名通常为 `group-record-xxxxx.json`
        </v-card-text>
      </v-card>
    </v-col>


    <v-col cols="12" md="4" sm="4" xl="3">
      <v-card hover prepend-icon="mdi-cards-playing-diamond-multiple-outline" @click="$router.push('/tools/dice/record')">
        <template v-slot:title>
          FF14九宫幻卡对局分析器
        </template>
        <v-card-text>
          该工具是属于FF14（最终幻想14）里面的一个名为《九宫幻卡》的游戏的分析器，根据预设好的NPC对局情况，玩家可以根据该工具提供的卡牌放入进行对战，从而更为轻松的战胜对手。
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="4" sm="4" xl="3">
      <v-card hover prepend-icon="mdi-view-dashboard-edit" @click="$router.push('/tools/dice/trpg')">
        <template v-slot:title>
          TRPG模组编辑器
        </template>
        <v-card-text>
          该工具属于mirai-rulateday-dice 插件中的TRPG模组功能相关。使用该工具可以更加轻松的编写出想要的模组文件。
        </v-card-text>
      </v-card>
    </v-col>

  </v-row>
</template>


<script setup lang="ts">
</script>