import { Component } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService],
})
export class TodoComponent {
  todos: Todo[] = [];
  /**
   * Le todo qui rerésente le formulaire d'ajout d'un todo
   */
  todo = new Todo();
  constructor(private todoService: TodoService) {
    this.todos = this.todoService.getTodos();
  }
  addTodo() {
    this.todoService.addTodo(this.todo);
    this.todo = new Todo();
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }
}
