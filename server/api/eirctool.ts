import restUtil from "~/service";

const tokenGenerate = (robot: EircbcToolTokenGenerateVo): Promise<ServerResponse<string>> => {
  return restUtil.put<ServerResponse<string>>(
    "/api/v1/eircbctool/token/generate",
    robot
  );
};

export { tokenGenerate };
