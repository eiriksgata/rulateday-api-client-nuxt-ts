
export default class FormRules {

  static Building = {
    name: [
      (v: any) => !!v || '必填项',
      (v: string | any[]) => v.length <= 20 || '长度不能超过20',
    ],
    describe: [
      (v: string | any[]) => v.length <= 50 || '长度不能超过50',
    ],
    floor: [
      (v: string) => /^\d+$/.test(v) || '请输入正整数',
      (v: number) => v <= 999 || '数值最高999',
      (v: number) => v >= 1 || '数值最低1',
    ],
    code: [
      (v: string) => v.length <= 20 || '长度不能超过20'
    ],
    unit: [
      (v: string) => /^\d+$/.test(v) || '请输入正整数',
      (v: number) => v <= 999 || '数值最高999',
      (v: number) => v >= 1 || '数值最低1',
    ],
    room: [
      (v: string) => /^\d+$/.test(v) || '请输入正整数',
      (v: number) => v <= 999 || '数值最高999',
      (v: number) => v >= 1 || '数值最低1',
    ]
  };


  static Device = {
    name: [
      (v: any) => !!v || '必填项',
      (v: string) => v.length < 20 || '长度不能超过20'
    ],
    code: [
      (v: string) => v.length == 8 || '必须为8位'
    ],
    location: [
      (v: string) => v.length <= 20 || '长度不能超过20'
    ],
    hardwareVersion: [
      (v: string) => v.length <= 20 || '长度不能超过20'
    ],
    softwareVersion: [
      (v: string) => v.length <= 20 || '长度不能超过20'
    ],
    ipv4: [
      (v: string) => v.length <= 15 || '长度不能超过15',
      (v: string) => /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/.test(v) || 'ipv4格式不正确'
    ],
    ipv6: [
      (v: string) => v.length <= 40 || '长度不能超过40',
      // (v: string) => /^([\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^::([\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:):([\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){2}:([\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){3}:([\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^:((:[\da-fA-F]{1,4}){1,6}|:)$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?$|^([\da-fA-F]{1,4}:){6}:$/.test(v) || 'ipv6格式不正确'
    ],
    mac: [
      (v: string) => v.length <= 30 || '长度不能超过30'
    ],
    intro: [
      (v: string) => v.length <= 20 || '长度不能超过20'
    ]
  }

  static Permissions = {
    name: [
      (v: any) => !!v || '必填项',
      (v: string) => v.length < 20 || '长度不能超过20'
    ]
  }

  static House = {
    name: [
      (v: any) => !!v || '必填项',
      (v: string) => v.length <= 20 || '长度不能超过20'
    ],
    code: [
      (v: string) => v.length <= 50 || '长度不能超过50'
    ],
    numberPlate: [
      (v: string) => v.length <= 20 || '长度不能超过20'
    ],
    unit: [
      (v: any) => !!v || '必填项',
      (v: number) => v <= 99 || '数值不能>99'
    ],
    floor: [
      (v: any) => !!v || '必填项',
      (v: number) => v <= 99 || '数值不能>99'
    ],
    houseNo: [
      (v: any) => !!v || '必填项',
      (v: number) => v <= 99 || '数值不能>99'
    ],
    houseCode: [
      (v: any) => !!v || '必填项',
      (v: string) => v.length == 8 || '长度必须为8位',
      (v: string) => /[0-9]+/g.test(v) || '输入必须为数字0-9'
    ],
    state: [
      (v: any) => !!v || '必填项',
    ],
    area: [
      (v: string) => v.length <= 5 || '长度不能超过5'
    ],
    use: [
      (v: any) => !!v || '必填项',
    ],
    building: [
      (v: any) => !!v || '必填项',
    ],
  }

  static AutoCreateHouse = {
    buildingName: [
      (v: any) => !!v || '必填项',
      (v: number) => v != -1 || '必填项',
    ],
    unitName: [
      (v: any) => !!v || '必填项',
      (v: string) => v.length <= 20 || '长度不能超过20'
    ]


  }

  static Personnel = {
    name: [
      (v: any) => !!v || '必填项',
      (v: string) => v.length <= 20 || '长度不能超过20'
    ],
    sex: [
      (v: any) => !!v || '必填项'
    ],
    nation: [
      (v: any) => !!v || '必填项'
    ],

    house: [
      (v: any) => !!v || '必填项'
    ],
    code: [
      (v: string) => v.length <= 50 || '长度不能超过50'
    ],
    remark: [
      (v: string) => v.length <= 30 || '长度不能超过50'
    ]

  }


  static Authorization = {
    personnel: [
      (v: any) => !!v || '必填项'
    ],
    cardNumber: [
      (v: any) => !!v || '必填项',
      (v: string) => v.length <= 10 || '长度不能超过10'
    ],
    houseCode: [
      (v: any) => !!v || '必填项',
      (v: string) => v.length == 8 || '长度必须为8位'
    ],
    notBeforeData: [
      (v: any) => !!v || '必填项'
    ],
    expiredAtData: [
      (v: any) => !!v || '必填项'
    ],
    device: [

    ]

  }





}