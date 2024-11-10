export type TaskPlainObject = {
  id: string;
  name: string;
  date: Date;
  createdAt: Date;
  userId: string;
};

export type TaskPlainObjectWithoutUserId = Omit<TaskPlainObject, 'userId'>;
