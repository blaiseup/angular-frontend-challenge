export enum TodoStatus {
  Complete = "COMPLETE",
  InProgress = "IN_PROGRESS",
}

export interface Todo {
  id: number;
  name?: string;
  status: TodoStatus;
}
