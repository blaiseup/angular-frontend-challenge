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

  constructor(private readonly actions$: Actions, private readonly store: Store, private readonly todoService: TodoService) {}
}
