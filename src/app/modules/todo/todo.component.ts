import { Component, OnInit } from "@angular/core";
import { filter, Observable, take } from "rxjs";
import { getTodos, addTodo, removeTodo, changeTodoStatus, changeTodoName, updateTodoDetails } from "../store/todo/todo.actions";
import { select, Store } from "@ngrx/store";
import { getAllCompleteTodos, getAllInProgressTodos, getAllTodos } from "../store/todo/todo.selectors";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { EditTodoDialogComponent } from "./components/edit-todo-dialog/edit-todo-dialog.component";
import { Todo, TodoPriority, TodoStatus } from "src/app/models/todo.model";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"],
})
export class TodoComponent implements OnInit {
  allTodos$: Observable<Todo[]> = this.store.pipe(select(getAllTodos));
  inProgressTodos$: Observable<Todo[]> = this.store.pipe(select(getAllInProgressTodos));
  completeTodos$: Observable<Todo[]> = this.store.pipe(select(getAllCompleteTodos));

  constructor(private store: Store, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(getTodos());
  }

  addNewTodo(props: { name: string; priority: TodoPriority }) {
    this.store.dispatch(addTodo({ name: props.name, priority: props.priority }));
  }

  changeTodoName(todo: Todo) {
    this.store.dispatch(changeTodoName({ todoId: todo.id, name: todo.name }));
  }

  editTodo(todo: Todo) {
    const dialogRef: MatDialogRef<EditTodoDialogComponent, Todo> = this.dialog.open(EditTodoDialogComponent, {
      data: { todo: todo },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.updateTodo(result);
    });
  }

  updateTodo(todo: Todo) {
    this.store.dispatch(updateTodoDetails({ todoId: todo.id, name: todo.name, priority: todo.priority }));
  }

  removeTodo(todo: Todo) {
    this.store.dispatch(removeTodo({ todoId: todo.id }));
  }

  changeTodoStatusComplete(todo: Todo) {
    this.store.dispatch(changeTodoStatus({ todoId: todo.id, status: TodoStatus.Complete }));
  }

  changeTodoStatusInProgress(todo: Todo) {
    this.store.dispatch(changeTodoStatus({ todoId: todo.id, status: TodoStatus.InProgress }));
  }
}
