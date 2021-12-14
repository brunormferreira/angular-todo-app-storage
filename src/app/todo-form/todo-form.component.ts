import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoService } from '../services/todo.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  form: FormGroup;

  @Output()
  newTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

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
  }

  ngOnInit(): void {}

  get formValues(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onAddNewTodo(): void {
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

    this.newTodo.emit(payload);

    this.clear();
  }

  clear(): void {
    this.form.reset();
  }
}
