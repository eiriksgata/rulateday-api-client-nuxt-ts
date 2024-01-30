import restUtil from "~/service";

const getUsers = (): Promise<ServerResponse<Array<User>>> => {
  return restUtil.get<ServerResponse<Array<User>>>("/users");
};

const userSave = (user: User): Promise<ServerResponse<Array<Object>>> => {
  return restUtil.put<ServerResponse<Array<User>>>("/user/create", user);
};

const userUpdate = (user: User): Promise<ServerResponse<Array<Object>>> => {
  return restUtil.put<ServerResponse<Array<User>>>("/user", user);
};

const userDelete = (userId: number): Promise<ServerResponse<Object>> => {
  return restUtil.delete<ServerResponse<Object>>(`/user/${userId}`);
};

const userPasswordReset = (
  oldPassword: string,
  newPassword: string
): Promise<ServerResponse<Object>> => {
  return restUtil.put<ServerResponse<Object>>(
    `/api/v1/user/password/reset`,
    {
      oldPassword: oldPassword,
      newPassword: newPassword,
    }
  );
};

const userJwtGen = (
  issuedAt: Date,
  expireDate: Date
): Promise<
  ServerResponse<{
    expirationTime: Date;
    loginAccount: string;
    token: string;
  }>
> => {
  return restUtil.put<
    ServerResponse<{
      expirationTime: Date;
      loginAccount: string;
      token: string;
    }>
  >(`/token/generate`, {
    issuedAt: issuedAt,
    expireDate: expireDate,
  });
};

export {
  getUsers,
  userSave,
  userDelete,
  userPasswordReset,
  userUpdate,
  userJwtGen,
};
