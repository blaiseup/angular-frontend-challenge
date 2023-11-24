import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EditTodoDialogComponent } from "./edit-todo-dialog.component";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("EditTodoDialogComponent", () => {
  let component: EditTodoDialogComponent;
  let fixture: ComponentFixture<EditTodoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTodoDialogComponent],
      imports: [MatDialogModule, MatInputModule, FormsModule, ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTodoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
