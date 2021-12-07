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

    this.load();
    // this.form.statusChanges.subscribe((status) => console.log(status));
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
    this.save();
    this.clear();
  }

  remove(todo: Todo): void {
    const index = this.getTodoIndex(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.save();
  }

  // update(todo: any): void {
  //   const index = this.getTodoIndex(todo);

  //   this.todos[index].title = this.formValues['title'].value;
  //   this.save();
  // }

  markAsDone(todo: Todo): void {
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo): void {
    todo.done = false;
    this.save();
  }

  clear(): void {
    this.form.reset();
  }

  save(): void {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
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
