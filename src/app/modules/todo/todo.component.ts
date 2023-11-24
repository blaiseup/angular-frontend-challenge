import { Component, OnInit } from '@angular/core';
import { filter, Observable, take } from 'rxjs';
import { getTodos, addTodo, removeTodo, changeTodoStatus, changeTodoName } from '../store/todo/todo.actions';
import { select, Store } from '@ngrx/store';
import { getAllTodos } from '../store/todo/todo.selectors';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from './components/edit-todo-dialog/edit-todo-dialog.component';
import { Todo, TodoStatus } from 'src/app/models/todo.model';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  statusEnum = TodoStatus;

  newTodo = new FormControl('', [Validators.required]);

  allTodos$: Observable<Todo[]> = this.store.pipe(select(getAllTodos));

  constructor(
    private store: Store,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getTodos());
  }
  
  addNewTodo() {
    if (!this.newTodo.value) return;
    this.store.dispatch(addTodo({ name: this.newTodo.value }))
  }

  changeTodoName(todo: Todo) {
    this.store.dispatch(changeTodoName({ todo }))
  }

  changeTodoStatus(todo: Todo) {
    this.store.dispatch(changeTodoStatus({ todo }))
  }

  removeTodo(todo: Todo) {
    this.store.dispatch(removeTodo({ todo }))
  }
}
