import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public todos: Todo[] = [];
  public title: string = 'Minhas tarefas';
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
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

    this.form.statusChanges.subscribe((status) => console.log(status));

    this.todos.push(new Todo(1, 'Comprar pão', false));
    this.todos.push(new Todo(2, 'Comprar queijo', true));
    this.todos.push(new Todo(3, 'Comprar presunto', false));
  }

  get formValues(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  add(): void {
    if (this.form.invalid) {
      return;
    }

    // const title = this.form.get('title')?.value;
    const title = this.formValues['title'].value;
    const id = this.todos.length + 1;

    this.todos.push(new Todo(id, title, false));
    this.clear();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }

  markAsDone(todo: Todo) {
    todo.done = true;
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
  }

  clear(): void {
    this.form.reset();
  }
}
