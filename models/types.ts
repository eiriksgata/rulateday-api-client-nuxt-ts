type ServerResponse<T> = {
  code: number;
  message: string;
  data: T;
};

type Card = {
  id: number;
  type: number;
  rarity: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
  cardNo: string;
  cardCode: string;
  name: string;
  describe: string;
  title: string;
  disabled?: boolean;
  color?: string;
};

type NpcInfo = {
  id: number;
  createdAt: Date;
  name: string;
  describe: string;
  code: string;
  updatedAt: Date;
  position: string;
};

type Scheme = {
  id: number;
  createdAt: Date;
  name: string;
  describe: string;
  characterId: number;
  updatedAt: Date;
  code: string;
  author: string;
  priority: number;
};

type SchemeNode = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  cardId: number;
  schemeId: number;
  describe: string;
  first: number;
  parentId: number;
  cardPosition: number;
  children?: SchemeNode[];
};

type SchemeNodeTreeStruct = {
  offensive: SchemeNode;
  defensive: SchemeNode;
};

type Role = {
  id?: number;
  name: string;
  intro: string;
  code: string;
  permissions?: Array<Permission>;
};

type Permission = {
  id :number
  parentId: number
  name : string
  alias : string
  action : string
  children : any
}