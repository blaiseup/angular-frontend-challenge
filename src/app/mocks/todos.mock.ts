import { Todo, TodoPriority, TodoStatus } from "../models/todo.model";

export const MOCK_TODOS: Todo[] = [
  {
    id: 1,
    name: "My first todo",
    status: TodoStatus.Complete,
    priority: TodoPriority.High,
  },
  {
    id: 2,
    name: "My second todo",
    status: TodoStatus.InProgress,
    priority: TodoPriority.Low,
  },
];
