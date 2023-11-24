import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Todo, TodoPriority } from "src/app/models/todo.model";

@Component({
  selector: "app-todo-form",
  templateUrl: "./todo-form.component.html",
  styleUrls: ["./todo-form.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent implements OnInit {
  @Input() todo: Todo;

  @Output() todoSubmitted = new EventEmitter<{ name: string; priority: TodoPriority }>();

  todoForm: FormGroup;

  todoPriorities = Object.values(TodoPriority);

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      name: ["", Validators.required],
      priority: [TodoPriority.Low, Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.todo) {
      this.todoForm.patchValue({
        name: this.todo.name,
        priority: this.todo.priority,
      });
    }
  }

  handleSubmit(): void {
    if (this.todoForm.valid) {
      const { name, priority } = this.todoForm.value;
      this.todoSubmitted.emit({ name, priority });

      this.todoForm.reset({
        name: "",
        priority: TodoPriority.Low,
      });
    }
  }
}
