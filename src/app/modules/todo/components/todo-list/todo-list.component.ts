import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Todo, TodoStatus } from "src/app/models/todo.model";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  statusEnum = TodoStatus;

  @Input() todos: Todo[];

  @Input() emptyListMessage: string = "No todos";

  @Output() onChangeTodoStatusComplete = new EventEmitter<Todo>();

  @Output() onChangeTodoStatusInProgress = new EventEmitter<Todo>();

  @Output() onRemoveTodo = new EventEmitter<Todo>();

  @Output() onEditTodo = new EventEmitter<Todo>();

  changeTodoStatusComplete(todo: Todo) {
    this.onChangeTodoStatusComplete.emit(todo);
  }

  changeTodoStatusInProgress(todo: Todo) {
    this.onChangeTodoStatusInProgress.emit(todo);
  }

  removeTodo(todo: Todo) {
    this.onRemoveTodo.emit(todo);
  }

  editTodo(todo: Todo) {
    this.onEditTodo.emit(todo);
  }
}
