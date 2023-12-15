type Records = {
  content: string;
  date: string;
  senderId: number;
  senderName: string;
};

type ChatRecordData = {
  createdAt: string;
  createdById: number;
  groupId: number;
  groupName: string;
  records: Array<Records>;
};

type ContentStyleData = {
  prependAvatar: string;
  title: string;
  subtitle: string;
};

export type { Records , ChatRecordData , ContentStyleData }