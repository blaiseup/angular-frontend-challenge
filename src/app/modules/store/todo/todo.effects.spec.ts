import { TodoService } from "src/app/services/todo.service";
import { TodoEffects } from "./todo.effects";
import { TestBed } from "@angular/core/testing";
import * as actions from "./todo.actions";
import { Todo, TodoStatus } from "src/app/models/todo.model";
import { Observable, catchError, of, throwError } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { Action } from "@ngrx/store";

describe("Todo Effects", () => {
  let effects: TodoEffects;
  let todoServiceSpy: jasmine.SpyObj<TodoService>;
  let actions$ = new Observable<Action>();

  beforeEach(() => {
    todoServiceSpy = jasmine.createSpyObj("TodoService", ["getTodos", "addTodo", "changeTodoName", "changeTodoStatus", "removeTodo"]);
    TestBed.configureTestingModule({
      providers: [TodoEffects, provideMockActions(() => actions$), provideMockStore(), { provide: TodoService, useValue: todoServiceSpy }],
    });
    effects = TestBed.inject(TodoEffects);
  });

  it("should dispatch getTodosSuccess on successful getTodos", (done: DoneFn) => {
    const todoList: Todo[] = [{ id: 1, name: "Todo", status: TodoStatus.InProgress }];
    const action = actions.getTodos();
    const outcome = actions.getTodosSuccess({ todoList });

    actions$ = of(action);
    todoServiceSpy.getTodos.and.returnValue(of(todoList));

    effects.getToDoList$.subscribe((resultAction) => {
      expect(resultAction).toEqual(outcome);
      done();
    });
  });

  it("should dispatch getTodosFailure on failed getTodos", (done: DoneFn) => {
    const action = actions.getTodos();
    const error = new Error("");
    const outcome = actions.getTodosFailure({ error });

    actions$ = of(action);
    todoServiceSpy.getTodos.and.returnValue(throwError(() => error));

    effects.getToDoList$.subscribe((resultAction) => {
      expect(resultAction).toEqual(outcome);
      done();
    });
  });

  it("should dispatch addTodoSuccess on successful addTodo", (done: DoneFn) => {
    const newTodo: Todo = { id: 1, name: "Todo", status: TodoStatus.InProgress };
    const action = actions.addTodo({ name: newTodo.name });
    const outcome = actions.addTodoSuccess({ todo: newTodo });

    actions$ = of(action);
    todoServiceSpy.addTodo.and.returnValue(of(newTodo));

    effects.addTodo$.subscribe((resultAction) => {
      expect(resultAction).toEqual(outcome);
      done();
    });
  });

  it("should dispatch addTodoFailure on failed addTodo", (done: DoneFn) => {
    const error = new Error("");
    const action = actions.addTodo({ name: "Todo" });
    const outcome = actions.addTodoFailure({ error });

    actions$ = of(action);
    todoServiceSpy.addTodo.and.returnValue(throwError(() => error));

    effects.addTodo$.subscribe((resultAction) => {
      expect(resultAction).toEqual(outcome);
      done();
    });
  });

  it("should dispatch changeTodoNameSuccess on successful changeTodoName", (done: DoneFn) => {
    const updatedTodo: Todo = { id: 1, name: "Todo", status: TodoStatus.InProgress };
    const action = actions.changeTodoName({ todoId: updatedTodo.id, name: updatedTodo.name });
    const outcome = actions.changeTodoNameSuccess({ todo: updatedTodo });

    actions$ = of(action);
    todoServiceSpy.changeTodoName.and.returnValue(of(updatedTodo));

    effects.changeTodoName$.subscribe((resultAction) => {
      expect(resultAction).toEqual(outcome);
      done();
    });
  });

  it("should dispatch changeTodoNameFailure on failed changeTodoName", (done: DoneFn) => {
    const error = new Error("");
    const action = actions.changeTodoName({ todoId: 1, name: "Todo" });
    const outcome = actions.changeTodoNameFailure({ error });

    actions$ = of(action);
    todoServiceSpy.changeTodoName.and.returnValue(throwError(() => error));

    effects.changeTodoName$.subscribe((resultAction) => {
      expect(resultAction).toEqual(outcome);
      done();
    });
  });

  it("should dispatch changeTodoStatusSuccess on successful changeTodoStatus", (done: DoneFn) => {
    const updatedTodo: Todo = { id: 1, name: "Todo", status: TodoStatus.Complete };
    const action = actions.changeTodoStatus({ todoId: updatedTodo.id, status: TodoStatus.Complete });
    const outcome = actions.changeTodoStatusSuccess({ todo: updatedTodo });

    actions$ = of(action);
    todoServiceSpy.changeTodoStatus.and.returnValue(of(updatedTodo));

    effects.changeTodoStatus$.subscribe((resultAction) => {
      expect(resultAction).toEqual(outcome);
      done();
    });
  });

  it("should dispatch changeTodoStatusFailure on failed changeTodoStatus", (done: DoneFn) => {
    const error = new Error("");
    const action = actions.changeTodoStatus({ todoId: 1, status: TodoStatus.Complete });
    const outcome = actions.changeTodoStatusFailure({ error });

    actions$ = of(action);
    todoServiceSpy.changeTodoStatus.and.returnValue(throwError(() => error));

    effects.changeTodoStatus$.subscribe((resultAction) => {
      expect(resultAction).toEqual(outcome);
      done();
    });
  });

  it("should dispatch removeTodoSuccess on successful removeTodo", (done: DoneFn) => {
    const removedTodo: Todo = { id: 1, name: "Todo", status: TodoStatus.Complete };
    const action = actions.removeTodo({ todoId: removedTodo.id });
    const outcome = actions.removeTodoSuccess({ todo: removedTodo });

    actions$ = of(action);
    todoServiceSpy.removeTodo.and.returnValue(of(removedTodo));

    effects.removeTodo$.subscribe((resultAction) => {
      expect(resultAction).toEqual(outcome);
      done();
    });
  });

  it("should dispatch removeTodoFailure on failed removeTodo", (done: DoneFn) => {
    const error = new Error("");
    const action = actions.removeTodo({ todoId: 1 });
    const outcome = actions.removeTodoFailure({ error });

    actions$ = of(action);
    todoServiceSpy.removeTodo.and.returnValue(throwError(() => error));

    effects.removeTodo$.subscribe((resultAction) => {
      expect(resultAction).toEqual(outcome);
      done();
    });
  });
});
