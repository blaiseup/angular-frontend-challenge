import { TestBed } from "@angular/core/testing";
import { PrioritySortPipe } from "./priority-sort.pipe";
import { Todo, TodoPriority, TodoStatus } from "src/app/models/todo.model";

describe("PrioritySortPipe", () => {
  let pipe: PrioritySortPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrioritySortPipe],
    });
    pipe = TestBed.inject(PrioritySortPipe);
  });

  it("should create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  it("should sort todos by priority (High > Medium > Low)", () => {
    const todos: Todo[] = [
      { id: 1, name: "Todo 1", priority: TodoPriority.Low, status: TodoStatus.InProgress },
      { id: 2, name: "Todo 2", priority: TodoPriority.High, status: TodoStatus.InProgress },
      { id: 3, name: "Todo 3", priority: TodoPriority.Medium, status: TodoStatus.InProgress },
    ];

    const sortedTodos = pipe.transform(todos);

    expect(sortedTodos).toEqual([
      { id: 2, name: "Todo 2", priority: TodoPriority.High, status: TodoStatus.InProgress },
      { id: 3, name: "Todo 3", priority: TodoPriority.Medium, status: TodoStatus.InProgress },
      { id: 1, name: "Todo 1", priority: TodoPriority.Low, status: TodoStatus.InProgress },
    ]);
  });

  it("should handle empty array", () => {
    const sortedTodos = pipe.transform([]);
    expect(sortedTodos).toEqual([]);
  });

  it("should not modify the original array", () => {
    const todos: Todo[] = [
      { id: 1, name: "Todo 1", priority: TodoPriority.Low, status: TodoStatus.InProgress },
      { id: 2, name: "Todo 2", priority: TodoPriority.High, status: TodoStatus.InProgress },
      { id: 3, name: "Todo 3", priority: TodoPriority.Medium, status: TodoStatus.InProgress },
    ];

    pipe.transform(todos);

    expect(todos).toEqual([
      { id: 1, name: "Todo 1", priority: TodoPriority.Low, status: TodoStatus.InProgress },
      { id: 2, name: "Todo 2", priority: TodoPriority.High, status: TodoStatus.InProgress },
      { id: 3, name: "Todo 3", priority: TodoPriority.Medium, status: TodoStatus.InProgress },
    ]);
  });
});
