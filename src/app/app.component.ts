import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppService } from './app.service';
import { TodoItem } from './app.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('newTodoInput') newTodoInput!: ElementRef;

  title = 'todo-angular';
  todoItems: TodoItem[] = [];

  constructor(private appService: AppService) {
    this.appService.getTodos()
      .subscribe((todos: TodoItem[]) => {
        this.todoItems = todos;
      });
  }

  get todoItemsIncomplete() {
    return this.todoItems.filter(item => !item.done);
  }

  get todoItemsComplete() {
    return this.todoItems.filter(item => item.done);
  }

  addTodo(newTodo: string) {
    if (newTodo && newTodo.trim().length > 0) {
      this.appService.createTodo(newTodo)
        .subscribe((todos: TodoItem[]) => {
          this.todoItems = todos;
        });
      this.newTodoInput.nativeElement.value = '';
    }
  }

  removeTodo(id: string) {
    this.appService.deleteTodo(id)
      .subscribe(() => {
        this.todoItems = this.todoItems.filter(item => item.id !== id);
      });
  }

  toggleTodo(todo: TodoItem) {
    this.appService.updateTodo(todo.id, { done: !todo.done })
      .subscribe((todos: TodoItem[]) => {
        this.todoItems = todos;
      });
  }

}
