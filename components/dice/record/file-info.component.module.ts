export type Records = {
  content: string;
  date: string;
  senderId: number;
  senderName: string;
};

export type ChatRecordData = {
  createdAt: string;
  createdById: number;
  groupId: number;
  groupName: string;
  records: Array<Records>;
};

export type contentStyleData = {
  avatar: string;
  title: string;
  content: string;
};
