export type TrpgMod = {
  name: string;
  describe: string;
  introduction: string;
  author: string;
  version: string;
  importData: TrpgModImportData;
  option: TrpgModOption;
  event: TrpgModEvent;
  [propName: string]: any;
};

export type TrpgModImportData = {
  role: TrpgModImportDataRole;
};

export type TrpgModImportDataRole = {
  [propName: string]: TrpgModRoleAttribute;
};

export type TrpgModRoleAttribute = {
  name: string;
  describe: string;
  attribute: string;
  consumables: string;
};

export type TrpgModOption = {
  [propName: string]: TrpgModOptionAttribute;
};

export type TrpgModOptionAttribute = {
  text: string;
  count: number;
  detection: TrpgModOptionDetection;
};

export type TrpgModOptionDetection = {
  role: string;
  attribute: string;
  consumables: string;
  showDice: boolean;
  success: TrpgModOptionDetectionResult;
  fail: TrpgModOptionDetectionResult;
};

export type TrpgModOptionDetectionResult = {
  text: string;
  nextNode: string;
  update: TrpgModOptionDetectionResultUpdate;
};

export type TrpgModOptionDetectionResultUpdate = {
  role: string;
  attribute: string;
  consumables: string;
};

export type TrpgModEvent = {
  node: TrpgModEventNode;
};

export type TrpgModEventNode = {
  [propName: string]: TrpgModEventNodeAttribute;
};

export type TrpgModEventNodeAttribute = {
  text: string;
  option: Array<string>;
};
