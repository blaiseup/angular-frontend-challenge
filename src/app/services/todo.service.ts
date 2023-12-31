import { Injectable } from "@angular/core";
import { Todo, TodoPriority, TodoStatus } from "../models/todo.model";
import { Observable, delay, of } from "rxjs";
import { MOCK_TODOS } from "../mocks/todos.mock";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  private mockTodos: Todo[] = MOCK_TODOS;

  getTodos(searchTerm: string = ""): Observable<Todo[]> {
    return of(JSON.parse(JSON.stringify(this.mockTodos.filter((todo) => todo.name.includes(searchTerm))))).pipe(delay(100));
  }

  addTodo(name: string, priority: TodoPriority): Observable<Todo> {
    const newTodo: Todo = {
      id: Math.max(1, ...this.mockTodos.map((todo) => todo.id)) + 1,
      name: name,
      status: TodoStatus.InProgress,
      priority: priority,
    };
    this.mockTodos.push(newTodo);
    return of(JSON.parse(JSON.stringify(newTodo))).pipe(delay(100));
  }

  changeTodoName(id: number, name: string): Observable<Todo> {
    const currentTodo = this.mockTodos.find((todo) => todo.id === id);
    if (!currentTodo) {
      throw new Error(`Todo with id ${id} not found`);
    }
    currentTodo.name = name;
    return of(JSON.parse(JSON.stringify(currentTodo))).pipe(delay(100));
  }

  changeTodoStatus(id: number, status: TodoStatus): Observable<Todo> {
    const currentTodo = this.mockTodos.find((todo) => todo.id === id);
    if (!currentTodo) {
      throw new Error(`Todo with id ${id} not found`);
    }
    currentTodo.status = status;
    return of(JSON.parse(JSON.stringify(currentTodo))).pipe(delay(100));
  }

  removeTodo(id: number): Observable<Todo> {
    const currentTodo = this.mockTodos.find((todo) => todo.id === id);
    if (!currentTodo) {
      throw new Error(`Todo with id ${id} not found`);
    }
    this.mockTodos = this.mockTodos.filter((todo) => todo.id !== currentTodo.id);
    return of(currentTodo).pipe(delay(100));
  }

  updateTodoDetails(id: number, name: string, priority: TodoPriority): Observable<Todo> {
    const currentTodo = this.mockTodos.find((todo) => todo.id === id);
    if (!currentTodo) {
      throw new Error(`Todo with id ${id} not found`);
    }
    currentTodo.name = name;
    currentTodo.priority = priority;
    return of(JSON.parse(JSON.stringify(currentTodo))).pipe(delay(100));
  }
}
