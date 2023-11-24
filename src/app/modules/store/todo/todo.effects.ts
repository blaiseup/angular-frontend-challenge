import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as actions from "./todo.actions";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { TodoService } from "src/app/services/todo.service";

@Injectable()
export class TodoEffects {
  getToDoList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getTodos),
      switchMap((_action) =>
        this.todoService.getTodos().pipe(
          map((todoList) => actions.getTodosSuccess({ todoList })),
          catchError((error) => of(actions.getTodosFailure({ error })))
        )
      )
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.addTodo),
      switchMap(({ name, priority }) =>
        this.todoService.addTodo(name, priority).pipe(
          map((todo) => actions.addTodoSuccess({ todo })),
          catchError((error) => of(actions.addTodoFailure({ error })))
        )
      )
    )
  );

  changeTodoName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.changeTodoName),
      switchMap(({ todoId, name }) =>
        this.todoService.changeTodoName(todoId, name).pipe(
          map((todo) => actions.changeTodoNameSuccess({ todo })),
          catchError((error) => of(actions.changeTodoNameFailure({ error })))
        )
      )
    )
  );

  changeTodoStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.changeTodoStatus),
      switchMap(({ todoId, status }) =>
        this.todoService.changeTodoStatus(todoId, status).pipe(
          map((todo) => actions.changeTodoStatusSuccess({ todo })),
          catchError((error) => of(actions.changeTodoStatusFailure({ error })))
        )
      )
    )
  );

  removeTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.removeTodo),
      switchMap(({ todoId }) =>
        this.todoService.removeTodo(todoId).pipe(
          map((todo) => actions.removeTodoSuccess({ todo })),
          catchError((error) => of(actions.removeTodoFailure({ error })))
        )
      )
    )
  );

  updateTodoDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updateTodoDetails),
      switchMap(({ todoId, name, priority }) =>
        this.todoService.updateTodoDetails(todoId, name, priority).pipe(
          map((todo) => actions.updateTodoDetailsSuccess({ todo })),
          catchError((error) => of(actions.updateTodoDetailsFailure({ error })))
        )
      )
    )
  );

  constructor(private readonly actions$: Actions, private readonly store: Store, private readonly todoService: TodoService) {}
}
