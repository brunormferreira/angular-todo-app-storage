import { Injectable } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[] = [{ id: 1, title: 'data from storage', done: false }];

  constructor() {}

  getTodos(): Todo[] {
    return [...this.todos];
  }

  post(todo: Todo): Todo[] {
    this.todos.push(todo);
    this.save();

    return this.getTodos();
  }

  delete(todo: Todo): Todo[] {
    const index = this.getTodoIndex(todo);
    this.todos.splice(index, 1);
    this.save();

    return this.getTodos();
  }

  save(): void {
    const data = JSON.stringify(this.todos);
    return localStorage.setItem('todos', data);
  }

  load(): void {
    const data = localStorage.getItem('todos');
    if (data) {
      this.todos = JSON.parse(data);
    }
  }

  getTodoIndex(todo: Todo): number {
    return this.todos.indexOf(todo);
  }
}
