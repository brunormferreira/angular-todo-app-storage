import { Component, OnInit, Input } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-count',
  templateUrl: './todo-count.component.html',
  styleUrls: ['./todo-count.component.css'],
})
export class TodoCountComponent implements OnInit {
  @Input()
  todos!: Todo[];

  constructor() {}

  ngOnInit(): void {}

  doneTodosCount(): number {
    if (!this.todos) return 0;
    const dataLength = this.todos.filter(
      (passenger: Todo) => passenger.done
    ).length;

    return dataLength;
  }
}
