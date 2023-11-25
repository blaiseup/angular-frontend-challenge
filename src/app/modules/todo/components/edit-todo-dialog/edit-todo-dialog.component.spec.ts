import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { EditTodoDialogComponent } from "./edit-todo-dialog.component";
import { Todo, TodoPriority, TodoStatus } from "src/app/models/todo.model";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("EditTodoDialogComponent", () => {
  let component: EditTodoDialogComponent;
  let fixture: ComponentFixture<EditTodoDialogComponent>;

  const mockDialogRef = {
    close: jasmine.createSpy("close"),
  };

  const mockTodo: Todo = {
    id: 1,
    name: "Test Todo",
    priority: TodoPriority.Low,
    status: TodoStatus.InProgress,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTodoDialogComponent],
      imports: [MatDialogModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { todo: mockTodo } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTodoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize todo from MAT_DIALOG_DATA", () => {
    expect(component.todo).toEqual(mockTodo);
  });

  it("should close dialog with updated todo on saveTodo", () => {
    const newName = "Updated Todo";
    const newPriority = TodoPriority.Medium;

    component.saveTodo({
      name: newName,
      priority: newPriority,
    });

    expect(mockDialogRef.close).toHaveBeenCalledWith({
      ...mockTodo,
      name: newName,
      priority: newPriority,
    });
  });

  it("should close dialog onCancel", () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
