import { createAction, props } from "@ngrx/store";
import { createFailureAction, createSuccessAction } from "../action-utils";
import { Todo, TodoPriority, TodoStatus } from "src/app/models/todo.model";

export const getTodos = createAction("[ToDo] Get ToDo List");
export const getTodosSuccess = createSuccessAction(getTodos, props<{ todoList: Todo[] }>());
export const getTodosFailure = createFailureAction(getTodos);

export const addTodo = createAction("[ToDo] Add ToDo Item", props<{ name: string; priority: TodoPriority }>());
export const addTodoSuccess = createSuccessAction(addTodo, props<{ todo: Todo }>());
export const addTodoFailure = createFailureAction(addTodo);

export const changeTodoName = createAction("[ToDo] Change ToDo Name", props<{ todoId: number; name: string }>());
export const changeTodoNameSuccess = createSuccessAction(changeTodoName, props<{ todo: Todo }>());
export const changeTodoNameFailure = createFailureAction(changeTodoName);

export const updateTodoDetails = createAction(
  "[ToDo] Update ToDo Details",
  props<{ todoId: number; name: string; priority: TodoPriority }>()
);
export const updateTodoDetailsSuccess = createSuccessAction(updateTodoDetails, props<{ todo: Todo }>());
export const updateTodoDetailsFailure = createFailureAction(updateTodoDetails);

export const changeTodoStatus = createAction("[ToDo] Change ToDo Status", props<{ todoId: number; status: TodoStatus }>());
export const changeTodoStatusSuccess = createSuccessAction(changeTodoStatus, props<{ todo: Todo }>());
export const changeTodoStatusFailure = createFailureAction(changeTodoStatus);

export const removeTodo = createAction("[ToDo] Remove ToDo Item", props<{ todoId: number }>());
export const removeTodoSuccess = createSuccessAction(removeTodo, props<{ todo: Todo }>());
export const removeTodoFailure = createFailureAction(removeTodo);
