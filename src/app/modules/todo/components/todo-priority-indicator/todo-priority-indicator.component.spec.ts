import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TodoPriorityIndicatorComponent } from "./todo-priority-indicator.component";
import { TodoPriority } from "src/app/models/todo.model";
import { MatIconModule } from "@angular/material/icon";

describe("TodoPriorityIndicatorComponent", () => {
  let component: TodoPriorityIndicatorComponent;
  let fixture: ComponentFixture<TodoPriorityIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoPriorityIndicatorComponent],
      imports: [MatIconModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoPriorityIndicatorComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should apply high-priority class when todoPriority is High", () => {
    component.todoPriority = TodoPriority.High;
    fixture.detectChanges();

    const matIconElement: HTMLElement = fixture.nativeElement.querySelector("mat-icon");
    expect(matIconElement.classList.contains("high-priority")).toBeTruthy();
  });

  it("should apply medium-priority class when todoPriority is Medium", () => {
    component.todoPriority = TodoPriority.Medium;
    fixture.detectChanges();

    const matIconElement: HTMLElement = fixture.nativeElement.querySelector("mat-icon");
    expect(matIconElement.classList.contains("medium-priority")).toBeTruthy();
  });

  it("should apply low-priority class when todoPriority is Low", () => {
    component.todoPriority = TodoPriority.Low;
    fixture.detectChanges();

    const matIconElement: HTMLElement = fixture.nativeElement.querySelector("mat-icon");
    expect(matIconElement.classList.contains("low-priority")).toBeTruthy();
  });
});
