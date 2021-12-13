import { Injectable } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[] = [];
  storageName: string = 'todos';

  constructor() {}

  getTodos(): Todo[] {
    return [...this.todos];
  }

  post(todo: Todo): Todo[] {
    this.todos.push(todo);
    this.saveOnStorage();

    return this.getTodos();
  }

  delete(todo: Todo): Todo[] {
    const DELETE_COUNT = 1;
    const startIdx = this.getTodoIndex(todo);

    this.todos.splice(startIdx, DELETE_COUNT);
    this.saveOnStorage();

    return this.getTodos();
  }

  saveOnStorage(): void {
    const data = JSON.stringify(this.todos);
    return localStorage.setItem(this.storageName, data);
  }

  loadStorageData(): void {
    const data = localStorage.getItem(this.storageName);
    if (data) {
      this.todos = JSON.parse(data);
    }
  }

  getTodoIndex(todo: Todo): number {
    return this.todos.indexOf(todo);
  }
}
