import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { Todo, TodoPriority, TodoStatus } from "src/app/models/todo.model";
import { TodoFormComponent } from "./todo-form.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("TodoFormComponent", () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoFormComponent],
      imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, NoopAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize the form with default values", () => {
    expect(component.todoForm.value).toEqual({
      name: "",
      priority: TodoPriority.Low,
    });
  });

  it("should patch form values when `todo` input is provided", () => {
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;

    const todo: Todo = {
      id: 1,
      name: "Test Todo",
      status: TodoStatus.InProgress,
      priority: TodoPriority.High,
    };

    component.todo = todo;
    fixture.detectChanges();

    expect(component.todoForm.value).toEqual({
      name: "Test Todo",
      priority: TodoPriority.High,
    });
  });

  it("should emit todoSubmitted event on form submission", () => {
    const spy = spyOn(component.todoSubmitted, "emit");

    component.todoForm.setValue({
      name: "Test Todo",
      priority: TodoPriority.Medium,
    });

    component.handleSubmit();

    expect(spy).toHaveBeenCalledWith({
      name: "Test Todo",
      priority: TodoPriority.Medium,
    });
  });

  it("should reset the form after submission", () => {
    component.todoForm.setValue({
      name: "Test Todo",
      priority: TodoPriority.Medium,
    });

    component.handleSubmit();

    expect(component.todoForm.value).toEqual({
      name: "",
      priority: TodoPriority.Low,
    });
  });
});
