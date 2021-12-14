import { Component, OnInit } from '@angular/core';

import { Todo } from 'src/app/models/todo.model';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];
  title: string = 'Minhas tarefas';

  constructor(private todoService: TodoService) {
    this.todoService.loadStorageData();
  }

  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
  }

  add(todo: Todo): void {
    this.todos = this.todoService.post(todo);
  }

  remove(todo: Todo): void {
    this.todos = this.todoService.delete(todo);
  }

  markAsDone(todo: Todo): void {
    todo.done = true;
    this.todoService.saveOnStorage();
  }

  markAsUndone(todo: Todo): void {
    todo.done = false;
    this.todoService.saveOnStorage();
  }
}
