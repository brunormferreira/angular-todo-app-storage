import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  form: FormGroup;

  constructor(private fb: FormBuilder, private todoService: TodoService) {
    this.form = this.fb.group({
      title: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.required,
        ]),
      ],
    });

    this.todoService.load();
  }

  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
  }

  get formValues(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  add(): void {
    if (this.form.invalid) {
      return;
    }

    const storageLength = this.todoService.getTodos().length;
    const title = this.formValues['title'].value;
    const id = storageLength + 1;

    const payload = {
      id,
      title,
      done: false,
    };

    this.todos = this.todoService.post(payload);
    this.clear();
  }

  remove(todo: Todo): void {
    this.todos = this.todoService.delete(todo);
  }

  markAsDone(todo: Todo): void {
    todo.done = true;
    this.todoService.save();
  }

  markAsUndone(todo: Todo): void {
    todo.done = false;
    this.todoService.save();
  }

  clear(): void {
    this.form.reset();
  }
}
