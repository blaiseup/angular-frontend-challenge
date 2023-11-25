import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { TodoPriority } from "src/app/models/todo.model";

@Component({
  selector: "app-todo-priority-indicator",
  templateUrl: "./todo-priority-indicator.component.html",
  styleUrls: ["./todo-priority-indicator.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoPriorityIndicatorComponent {
  todoPriorities = TodoPriority;

  @Input() todoPriority: TodoPriority;
}
