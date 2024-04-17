import restUtil from "~/service";

const getPermissions = (): Promise<ServerResponse<Array<Permission>>> => {
  return restUtil.get<ServerResponse<Array<Permission>>>("/permissions");
};

const permissionSave = (
  permission: Permission
): Promise<ServerResponse<Array<Object>>> => {
  return restUtil.put<ServerResponse<Array<Object>>>(
    "/permission",
    permission
  );
};

const permissionDelete = (
  permissionId: number
): Promise<ServerResponse<Array<Object>>> => {
  return restUtil.delete<ServerResponse<Array<Object>>>(
    `/permission/${permissionId}`
  );
};

export { getPermissions, permissionSave, permissionDelete };
