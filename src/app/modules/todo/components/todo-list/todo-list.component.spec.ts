import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TodoListComponent } from "./todo-list.component";
import { Todo, TodoPriority, TodoStatus } from "src/app/models/todo.model";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("TodoListComponent", () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    component.todos = [
      { id: 1, name: "Todo 1", status: TodoStatus.Complete, priority: TodoPriority.High },
      { id: 2, name: "Todo 2", status: TodoStatus.InProgress, priority: TodoPriority.High },
    ];
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should emit event on changing todo status to complete", () => {
    const todo: Todo = { id: 1, name: "Todo 1", status: TodoStatus.InProgress, priority: TodoPriority.High };
    spyOn(component.onChangeTodoStatusComplete, "emit");

    component.changeTodoStatusComplete(todo);

    expect(component.onChangeTodoStatusComplete.emit).toHaveBeenCalledWith(todo);
  });

  it("should emit event on changing todo status to in progress", () => {
    const todo: Todo = { id: 2, name: "Todo 2", status: TodoStatus.Complete, priority: TodoPriority.High };
    spyOn(component.onChangeTodoStatusInProgress, "emit");

    component.changeTodoStatusInProgress(todo);

    expect(component.onChangeTodoStatusInProgress.emit).toHaveBeenCalledWith(todo);
  });

  it("should emit event on removing todo", () => {
    const todo: Todo = { id: 1, name: "Todo 1", status: TodoStatus.Complete, priority: TodoPriority.High };
    spyOn(component.onRemoveTodo, "emit");

    component.removeTodo(todo);

    expect(component.onRemoveTodo.emit).toHaveBeenCalledWith(todo);
  });
});
