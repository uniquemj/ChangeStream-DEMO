import { DeleteResult, InsertOneResult, UpdateResult } from "mongodb";

type InsertMethod = {
  detail: "insert";
  fn: (doc: Partial<TaskInput>) => Promise<InsertOneResult<Document>>;
};

type DeleteMethod = {
  detail: "delete";
  fn: (filter: { ordinal: number }) => Promise<DeleteResult>;
};

type UpdateMethod = {
  detail: "update";
  fn: (filter: { ordinal: number }, data: Partial<Tasks>) => Promise<UpdateResult<Document>>;
};

export type Method = InsertMethod | DeleteMethod | UpdateMethod;