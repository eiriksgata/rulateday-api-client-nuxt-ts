import restUtil from "~/service";

const getRoles = (): Promise<ServerResponse<Array<Role>>> => {
  return restUtil.get<ServerResponse<Array<Role>>>("/roles");
};

const getRolePermissionByRoleId = (
  roleId: number
): Promise<ServerResponse<Role>> => {
  return restUtil.get<ServerResponse<Role>>(`/role/permissions/${roleId}`);
};

const saveRole = (role: Role): Promise<ServerResponse<object>> => {
  return restUtil.put<ServerResponse<object>>(`/role`, role);
};

const deleteRole = (id: number): Promise<ServerResponse<object>> => {
  return restUtil.delete<ServerResponse<Object>>(`/role/${id}`);
};

const rolePermissionsSave = (
  rolePermissionVo: RolePermissionsVo
): Promise<ServerResponse<object>> => {
  return restUtil.put<ServerResponse<Object>>(
    `/role/permissions/save`,
    rolePermissionVo
  );
};

export {
  getRoles,
  getRolePermissionByRoleId,
  saveRole,
  deleteRole,
  rolePermissionsSave,
};
