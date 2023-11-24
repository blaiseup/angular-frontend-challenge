import { Action, createReducer, on } from "@ngrx/store";
import * as actions from "./todo.actions";
import { Todo } from "src/app/models/todo.model";

export const TODO_FEATURE_KEY = "todo-store";

export interface TodoState {
  todoList: Todo[];
}

export const initialState: TodoState = {
  todoList: [],
};

const todoReducer = createReducer(
  initialState,
  on(actions.getTodosSuccess, (state, { todoList }) => ({
    ...state,
    todoList,
  })),
  on(actions.changeTodoName, (state, { todo }) => ({
    ...state,
    todoList: state.todoList.map((el) => (el.id === todo.id ? { ...el, name: todo.name } : el)),
  }))
);

export function reducer(state: TodoState | undefined, action: Action) {
  return todoReducer(state, action);
}
