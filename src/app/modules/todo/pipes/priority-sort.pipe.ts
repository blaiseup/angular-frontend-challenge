import { Pipe, PipeTransform } from "@angular/core";
import { Todo, TodoPriority } from "src/app/models/todo.model";

@Pipe({
  name: "prioritySort",
})
export class PrioritySortPipe implements PipeTransform {
  transform(todos: Todo[]): Todo[] {
    const priorityValues = {
      [TodoPriority.High]: 2,
      [TodoPriority.Medium]: 1,
      [TodoPriority.Low]: 0,
    };
    return [...todos].sort((a, b) => priorityValues[b.priority] - priorityValues[a.priority]);
  }
}
