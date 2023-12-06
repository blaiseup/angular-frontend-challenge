import { Action, createReducer, on } from "@ngrx/store";
import * as actions from "./todo.actions";
import { Todo } from "src/app/models/todo.model";
import { state } from "@angular/animations";

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
  on(actions.addTodoSuccess, (state, { todo }) => ({ ...state, todoList: [...state.todoList, todo] })),
  on(actions.changeTodoNameSuccess, (state, { todo }) => ({
    ...state,
    todoList: state.todoList.map((el) => (el.id === todo.id ? { ...el, name: todo.name } : el)),
  })),
  on(actions.changeTodoStatusSuccess, (state, { todo }) => ({
    ...state,
    todoList: state.todoList.map((el) => (el.id === todo.id ? { ...el, status: todo.status } : el)),
  })),
  on(actions.removeTodoSuccess, (state, { todo }) => ({
    ...state,
    todoList: state.todoList.filter((el) => el.id !== todo.id),
  })),
  on(actions.updateTodoDetailsSuccess, (state, { todo }) => ({
    ...state,
    todoList: state.todoList.map((el) => (el.id === todo.id ? { ...el, name: todo.name, priority: todo.priority } : el)),
  })),
  on(actions.searchTodoListSuccess, (state, { todoList }) => ({
    ...state,
    todoList,
  }))
);

export function reducer(state: TodoState | undefined, action: Action) {
  return todoReducer(state, action);
}
