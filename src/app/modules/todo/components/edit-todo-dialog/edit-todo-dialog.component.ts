import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Todo, TodoPriority } from "src/app/models/todo.model";

@Component({
  selector: "app-edit-todo-dialog",
  templateUrl: "./edit-todo-dialog.component.html",
  styleUrls: ["./edit-todo-dialog.component.css"],
})
export class EditTodoDialogComponent implements OnInit {
  todo: Todo;

  constructor(public dialogRef: MatDialogRef<EditTodoDialogComponent, Todo>, @Inject(MAT_DIALOG_DATA) public data: { todo: Todo }) {}

  ngOnInit(): void {
    this.todo = this.data.todo;
  }

  saveTodo(props: { name: string; priority: TodoPriority }) {
    this.dialogRef.close({ ...this.todo, name: props.name, priority: props.priority });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
