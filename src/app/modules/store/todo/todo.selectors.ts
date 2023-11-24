import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TodoState, TODO_FEATURE_KEY } from "./todo.reducer";
import { TodoStatus } from "src/app/models/todo.model";

export const getTodoState = createFeatureSelector<TodoState>(TODO_FEATURE_KEY);

export const getAllTodos = createSelector(getTodoState, (state) => state.todoList);

export const getAllInProgressTodos = createSelector(getAllTodos, (allTodos) =>
  allTodos.filter((todo) => todo.status === TodoStatus.InProgress)
);

export const getAllCompleteTodos = createSelector(getAllTodos, (allTodos) =>
  allTodos.filter((todo) => todo.status === TodoStatus.Complete)
);
