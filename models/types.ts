type ServerResponse<T> = {
  code: number;
  message: string;
  data: T;
};

type Role = {
  id?: number;
  name: string;
  intro: string;
  code: string;
  permissions?: Array<Permission>;
};

type Permission = {
  id: number;
  parentId?: number;
  name: string;
  alias: string;
  action: string;
  children?: Array<Permission>;
};

type User = {
  id: number;
  name: string;
  password?: string;
  pwd?: string;
  type: 1 | 2 | 3;
  isExpired: boolean;
  isLocked: boolean;
  isPasswdExpired: boolean;
  createdAt: Date;
  updatedAt: Date;
  roles?: Array<Number>;
};

type RolePermissionsVo = {
  roleId: number;
  permissions: Array<Number>;
};

type TokenPayload = {
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  roles: Array<string>;
};

type Robot = {
  id: number;
  name: string;
  createdAt: Date;
  description: string;
  machineCode: string;
  updatedAt: Date;
  expirationAt: Date;
};


