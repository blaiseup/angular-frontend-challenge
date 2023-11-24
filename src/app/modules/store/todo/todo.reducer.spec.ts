import { reducer, initialState, TodoState } from "./todo.reducer";
import * as actions from "./todo.actions";
import { Todo, TodoStatus } from "src/app/models/todo.model";

describe("Todo Reducer", () => {
  it("should return the default state", () => {
    const action = {} as any; // Action type not relevant for this test
    const state = reducer(undefined, action);

    expect(state).toEqual(initialState);
  });

  it("should handle getTodosSuccess action", () => {
    const todoList: Todo[] = [{ id: 1, name: "Todo 1", status: TodoStatus.InProgress }];
    const action = actions.getTodosSuccess({ todoList });
    const state = reducer(initialState, action);

    expect(state.todoList).toEqual(todoList);
  });

  it("should handle addTodoSuccess action", () => {
    const newTodo: Todo = { id: 1, name: "New Todo", status: TodoStatus.InProgress };
    const action = actions.addTodoSuccess({ todo: newTodo });
    const state = reducer(initialState, action);

    expect(state.todoList).toEqual([newTodo]);
  });

  it("should handle changeTodoNameSuccess action", () => {
    const existingTodo: Todo = { id: 1, name: "Old Name", status: TodoStatus.InProgress };
    const updatedTodo: Todo = { ...existingTodo, name: "New Name" };
    const initialStateWithTodo: TodoState = { todoList: [existingTodo] };

    const action = actions.changeTodoNameSuccess({ todo: updatedTodo });
    const state = reducer(initialStateWithTodo, action);

    expect(state.todoList).toEqual([updatedTodo]);
  });

  it("should handle changeTodoStatusSuccess action", () => {
    const existingTodo: Todo = { id: 1, name: "Todo", status: TodoStatus.InProgress };
    const updatedTodo: Todo = { ...existingTodo, status: TodoStatus.Complete };
    const initialStateWithTodo: TodoState = { todoList: [existingTodo] };

    const action = actions.changeTodoStatusSuccess({ todo: updatedTodo });
    const state = reducer(initialStateWithTodo, action);

    expect(state.todoList).toEqual([updatedTodo]);
  });

  it("should handle removeTodoSuccess action", () => {
    const todoToRemove: Todo = { id: 1, name: "Todo", status: TodoStatus.InProgress };
    const initialStateWithTodo: TodoState = { todoList: [todoToRemove] };

    const action = actions.removeTodoSuccess({ todo: todoToRemove });
    const state = reducer(initialStateWithTodo, action);

    expect(state.todoList).toEqual([]);
  });
});
