import { defineStore } from "pinia";
import { ContentStyleData } from "../components/dice/record/FileInfo.component.module";

export const useRecordOut = defineStore("recordOut", () => {
  const textContextSource = ref("");
  const contentStyleData = ref(new Array<ContentStyleData>());
  const chatMessageRecordHandlerResult = ref("");

  return {
    textContextSource,
    contentStyleData,
    chatMessageRecordHandlerResult,
  };
});
