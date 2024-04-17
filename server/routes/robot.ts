import restUtil from "~/service";

const getRobotList = (): Promise<ServerResponse<Array<Robot>>> => {
  return restUtil.get<ServerResponse<Array<Robot>>>("/api/v1/robot/list");
};

const robotDelete = (id: number) => {
  return restUtil.delete<ServerResponse<Array<Object>>>(`/api/v1/robot/${id}`);
};

const robotSave = (robot: Robot): Promise<ServerResponse<object>> => {
  return restUtil.put<ServerResponse<object>>("/api/v1/robot", robot);
};

const robotOpenRegister = (robot: Robot): Promise<ServerResponse<Robot>> => {
  return restUtil.put<ServerResponse<Robot>>(
    "/api/v1/robot/open/register",
    robot
  );
};

export { getRobotList, robotDelete, robotSave, robotOpenRegister };
