
export const cardTypeHandler = function (type: number): string {
  switch (type) {
    case 0:
      return '无';
    case 1:
      return '兽人';
    case 2:
      return '蛮神';
    case 3:
      return '拂晓';
    case 4:
      return '帝国';
  }
  return '未知';
}


export const cardSurfaceNumberHandler = function (value: number): string {
  if (value >= 10) {
    return 'A';
  }
  return value + '';
}

export const cardNameHandler = function (name: string): string {
  if (name.length > 4) {
    return name.substring(0, 4) + "..";
  }
  return name;
}

export default class FfxivCardData {


  static cardTypeItems = [
    {
      name: '无',
      code: 0
    },
    {
      name: '兽人',
      code: 1
    },
    {
      name: '蛮神',
      code: 2
    }, {
      name: '拂晓',
      code: 3
    }, {
      name: '帝国',
      code: 4
    }
  ]


  static cardRarityItems = [
    1,
    2,
    3,
    4,
    5
  ]

  static cardPositionItems = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9
  ]
}


export const formatToTree = function (ary: SchemeNode[], pid: number): SchemeNode[] {
  return ary
    .filter((item: SchemeNode) => item.parentId === pid)
    .map((item: any) => {
      // 通过父节点ID查询所有子节点
      item.children = formatToTree(ary, item.id);
      return item;
    });
}

export const authCheck = function (): boolean {
  const token = localStorage.getItem("token");
  if (token == null || token == undefined || token == '') {
    return false;
  }
  return true;
}