import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  @Input()
  todo!: Todo;

  @Output()
  remove: EventEmitter<Todo> = new EventEmitter<Todo>();

  @Output()
  done: EventEmitter<Todo> = new EventEmitter<Todo>();

  @Output()
  undone: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor() {}

  ngOnInit(): void {}

  onRemove(): void {
    this.remove.emit(this.todo);
  }

  onMarkAsDone(): void {
    this.done.emit(this.todo);
  }

  onMarkAsUndone(): void {
    this.undone.emit(this.todo);
  }
}
