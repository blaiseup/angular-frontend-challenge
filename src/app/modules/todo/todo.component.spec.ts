import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { TodoComponent } from "./todo.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTabsModule } from "@angular/material/tabs";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("TodoComponent", () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MatDialogModule, MatTabsModule, MatInputModule, FormsModule, ReactiveFormsModule],
      declarations: [TodoComponent],
      providers: [provideMockStore()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
