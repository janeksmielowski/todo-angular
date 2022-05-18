import { Component, ElementRef, ViewChild } from '@angular/core';

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('newTodoInput') newTodoInput!: ElementRef;

  title = 'todo-angular';
  todoItems: TodoItem[] = [
    {
      id: 0,
      title: 'Do the shopping',
      completed: false
    }, {
      id: 1,
      title: 'Go to the gym',
      completed: false
    }, {
      id: 2,
      title: 'Do the laundry',
      completed: false
    }
  ];
  nextTodoId = 3;
  get todoItemsIncomplete() {
    return this.todoItems.filter(item => !item.completed);
  }
  get todoItemsComplete() {
    return this.todoItems.filter(item => item.completed);
  }
  addTodo(newTodo: string) {
    if (newTodo) {
      const newItem: TodoItem = {
        id: this.nextTodoId++,
        title: newTodo,
        completed: false
      };
      this.todoItems.push(newItem);
      this.newTodoInput.nativeElement.value = '';
    }
  }
  removeTodo(item: TodoItem) {
    const index = this.todoItems.indexOf(item);
    this.todoItems.splice(index, 1);
  }
  toggleTodo(item: TodoItem) {
    item.completed = !item.completed;
  }
}
