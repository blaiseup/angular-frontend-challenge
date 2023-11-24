import { Todo, TodoStatus } from "../models/todo.model";

export const MOCK_TODOS: Todo[] = [
  {
    id: 1,
    name: "My first todo",
    status: TodoStatus.Complete,
  },
  {
    id: 2,
    name: "My second todo",
    status: TodoStatus.InProgress,
  },
];
