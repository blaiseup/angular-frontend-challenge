import { TestBed } from "@angular/core/testing";
import { TodoService } from "./todo.service";
import { TodoPriority, TodoStatus } from "../models/todo.model";
import { MOCK_TODOS } from "../mocks/todos.mock";

describe("TodoService", () => {
  let todoService: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService],
    });
    todoService = TestBed.inject(TodoService);
    todoService["mockTodos"] = MOCK_TODOS;
  });

  it("should be created", () => {
    expect(todoService).toBeTruthy();
  });

  it("should get todos", (done: DoneFn) => {
    todoService.getTodos().subscribe((todos) => {
      expect(todos).toEqual(todoService["mockTodos"]);
      done();
    });
  });

  it("should add a todo", (done: DoneFn) => {
    const todoName = "New Todo";
    const todoPriority = TodoPriority.High;
    const initialLength = todoService["mockTodos"].length;

    todoService.addTodo(todoName, todoPriority).subscribe((newTodo) => {
      expect(newTodo.name).toBe(todoName);
      expect(newTodo.status).toBe(TodoStatus.InProgress);
      expect(newTodo.priority).toBe(TodoPriority.High);
      expect(todoService["mockTodos"].length).toBe(initialLength + 1);
      done();
    });
  });

  it("should change todo name", (done: DoneFn) => {
    const todoId = 1;
    const newName = "Updated Name";

    todoService.changeTodoName(todoId, newName).subscribe((updatedTodo) => {
      expect(updatedTodo.id).toBe(todoId);
      expect(updatedTodo.name).toBe(newName);
      done();
    });
  });

  it("should change todo status", (done: DoneFn) => {
    const todoId = 1;
    const newStatus = TodoStatus.Complete;

    todoService.changeTodoStatus(todoId, newStatus).subscribe((updatedTodo) => {
      expect(updatedTodo.id).toBe(todoId);
      expect(updatedTodo.status).toBe(newStatus);
      done();
    });
  });

  it("should remove a todo", (done: DoneFn) => {
    const todoId = 1;
    const initialLength = todoService["mockTodos"].length;

    todoService.removeTodo(todoId).subscribe((removedTodo) => {
      expect(todoService["mockTodos"].length).toBe(initialLength - 1);
      expect(removedTodo.id).toBe(todoId);
      done();
    });
  });
});
