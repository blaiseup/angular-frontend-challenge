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
  {
    id: 3,
    name: "My third todo",
    status: TodoStatus.InProgress,
    priority: TodoPriority.Medium,
  },
  {
    id: 4,
    name: "My fourth todo",
    status: TodoStatus.InProgress,
    priority: TodoPriority.High,
  },
  {
    id: 5,
    name: "My fifth todo",
    status: TodoStatus.InProgress,
    priority: TodoPriority.Low,
  },
  {
    id: 6,
    name: "My sixth todo",
    status: TodoStatus.InProgress,
    priority: TodoPriority.Medium,
  },
];
