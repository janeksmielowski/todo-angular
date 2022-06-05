import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TodoItem } from "./app.types";

@Injectable()
export class AppService {

  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get<TodoItem[]>('/api/todos');
  }

  createTodo(text: string) {
    return this.http.post<TodoItem[]>('/api/todos', { text });
  }

  updateTodo(id: string, { text, done }: { text?: string, done?: boolean }) {
    return this.http.put<TodoItem[]>(`/api/todos/${id}`, { text, done });
  }

  deleteTodo(id: string) {
    return this.http.delete(`/api/todos/${id}`);
  }

}
