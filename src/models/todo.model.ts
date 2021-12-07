export class Todo {
  constructor(public id: number, public title: string, public done: boolean) {
    this.id = id;
    this.title = title;
    this.done = done;
  }
}
