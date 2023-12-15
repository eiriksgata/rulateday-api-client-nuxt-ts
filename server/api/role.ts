import httpRequest from "~/service";

const getRoles = (): Promise<ServerResponse<Array<Role>>> => {
  return httpRequest.get<ServerResponse<Array<Role>>>("/roles");
};

const getRolePermissionByRoleId = (
  roleId: number
): Promise<ServerResponse<Role>> => {
  return httpRequest.get<ServerResponse<Role>>(`/role/permissions/${roleId}`);
};

const saveRole = (role: Role): Promise<ServerResponse<object>> => {
  return httpRequest.put<ServerResponse<object>>(`/role`, role);
};

const deleteRole = (id: number) => {
  return httpRequest.delete<ServerResponse<Object>>(`/role/${id}`);
};

export { getRoles, getRolePermissionByRoleId, saveRole, deleteRole };
