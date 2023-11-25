import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { of } from "rxjs";
import { Todo, TodoPriority, TodoStatus } from "src/app/models/todo.model";
import { TodoComponent } from "./todo.component";
import { EditTodoDialogComponent } from "./components/edit-todo-dialog/edit-todo-dialog.component";
import * as todoActions from "../store/todo/todo.actions";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("TodoComponent", () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let mockStore: MockStore;

  const initialState = {
    todo: {
      todoList: [
        { id: 1, name: "Todo 1", priority: TodoPriority.Low, status: TodoStatus.InProgress },
        { id: 2, name: "Todo 2", priority: TodoPriority.Medium, status: TodoStatus.Complete },
      ],
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoComponent],
      providers: [provideMockStore({ initialState }), { provide: MatDialog, useValue: { open: () => ({ afterClosed: () => of({}) }) } }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should dispatch getTodos action on ngOnInit", () => {
    spyOn(mockStore, "dispatch");
    component.ngOnInit();
    expect(mockStore.dispatch).toHaveBeenCalledWith(todoActions.getTodos());
  });

  it("should dispatch addTodo action on addNewTodo", () => {
    spyOn(mockStore, "dispatch");
    const todoToAdd = { name: "New Todo", priority: TodoPriority.High };
    component.addNewTodo({ name: todoToAdd.name, priority: todoToAdd.priority });
    expect(mockStore.dispatch).toHaveBeenCalledWith(todoActions.addTodo({ name: todoToAdd.name, priority: todoToAdd.priority }));
  });

  it("should dispatch changeTodoName action on changeTodoName", () => {
    spyOn(mockStore, "dispatch");
    const todo = { id: 1, name: "Todo 1", priority: TodoPriority.Low, status: TodoStatus.InProgress };
    component.changeTodoName(todo);
    expect(mockStore.dispatch).toHaveBeenCalledWith(todoActions.changeTodoName({ todoId: todo.id, name: todo.name }));
  });

  it("should open EditTodoDialogComponent and dispatch updateTodoDetails action on editTodo", () => {
    spyOn(component.dialog, "open").and.returnValue({
      afterClosed: () => of({ name: "Updated Todo", priority: TodoPriority.Medium }),
    } as MatDialogRef<EditTodoDialogComponent, Todo>);
    spyOn(mockStore, "dispatch");
    const todo = { id: 1, name: "Todo 1", priority: TodoPriority.Low, status: TodoStatus.InProgress };
    component.editTodo(todo);
    expect(component.dialog.open).toHaveBeenCalledWith(EditTodoDialogComponent, { data: { todo } });
  });

  it("should dispatch removeTodo action on removeTodo", () => {
    spyOn(mockStore, "dispatch");
    const todo = { id: 1, name: "Todo 1", priority: TodoPriority.Low, status: TodoStatus.InProgress };
    component.removeTodo(todo);
    expect(mockStore.dispatch).toHaveBeenCalledWith(todoActions.removeTodo({ todoId: todo.id }));
  });

  it("should dispatch changeTodoStatus action with TodoStatus.Complete on changeTodoStatusComplete", () => {
    spyOn(mockStore, "dispatch");
    const todo = { id: 1, name: "Todo 1", priority: TodoPriority.Low, status: TodoStatus.InProgress };
    component.changeTodoStatusComplete(todo);
    expect(mockStore.dispatch).toHaveBeenCalledWith(todoActions.changeTodoStatus({ todoId: todo.id, status: TodoStatus.Complete }));
  });

  it("should dispatch changeTodoStatus action with TodoStatus.InProgress on changeTodoStatusInProgress", () => {
    spyOn(mockStore, "dispatch");
    const todo = { id: 1, name: "Todo 1", priority: TodoPriority.Low, status: TodoStatus.Complete };
    component.changeTodoStatusInProgress(todo);
    expect(mockStore.dispatch).toHaveBeenCalledWith(todoActions.changeTodoStatus({ todoId: todo.id, status: TodoStatus.InProgress }));
  });
});
