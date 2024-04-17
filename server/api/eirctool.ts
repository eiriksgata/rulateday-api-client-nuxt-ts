import restUtil from "~/service";

const tokenGenerate = (requestVo: EircbcToolTokenGenerateVo): Promise<ServerResponse<string>> => {
  return restUtil.put<ServerResponse<string>>(
    `/api/v1/eircbctool/token/generate`,
    requestVo
  );
};

const getTokenList = (): Promise<ServerResponse<Array<EircbcToolToken>>> => {
  return restUtil.get<ServerResponse<Array<EircbcToolToken>>>(
    `/api/v1/eircbctool/token`
  );
};

const tokenSave = (requestVo: EircbcToolToken): Promise<ServerResponse<null>> => {
  return restUtil.put<ServerResponse<null>>(
    `/api/v1/eircbctool/token`,
    requestVo
  );
};

const deleteById = (id: number): Promise<ServerResponse<null>> => {
  return restUtil.delete<ServerResponse<null>>(
    `/api/v1/eircbctool/token/${id}`
  );
}



export { tokenGenerate, tokenSave, getTokenList, deleteById };
