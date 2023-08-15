import { defineStore } from "pinia";
import { ContentStyleData } from "../components/dice/record/FileInfo.component.module";

export const useRecordOut = defineStore("recordOut", {
  state: () => ({
    textContextSource: ref(""),
    contentStyleData: ref(new Array<ContentStyleData>()),
    chatMessageRecordHandlerResult: ref(""),
  }),
});
