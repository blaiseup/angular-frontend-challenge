import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TodoListComponent } from "./todo-list.component";
import { TodoStatus } from "src/app/models/todo.model";
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
      { id: 1, name: "Todo 1", status: TodoStatus.Complete },
      { id: 2, name: "Todo 2", status: TodoStatus.InProgress },
    ];
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should emit event on changing todo status to complete", () => {
    const todo = { id: 1, name: "Todo 1", status: TodoStatus.InProgress };
    spyOn(component.onChangeTodoStatusComplete, "emit");

    component.changeTodoStatusComplete(todo);

    expect(component.onChangeTodoStatusComplete.emit).toHaveBeenCalledWith(todo);
  });

  it("should emit event on changing todo status to in progress", () => {
    const todo = { id: 2, name: "Todo 2", status: TodoStatus.Complete };
    spyOn(component.onChangeTodoStatusInProgress, "emit");

    component.changeTodoStatusInProgress(todo);

    expect(component.onChangeTodoStatusInProgress.emit).toHaveBeenCalledWith(todo);
  });

  it("should emit event on removing todo", () => {
    const todo = { id: 1, name: "Todo 1", status: TodoStatus.Complete };
    spyOn(component.onRemoveTodo, "emit");

    component.removeTodo(todo);

    expect(component.onRemoveTodo.emit).toHaveBeenCalledWith(todo);
  });
});
