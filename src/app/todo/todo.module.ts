import { NgModule } from "@angular/core";
import { TodoComponent } from "./todo/todo.component";
import { WeekTodoComponent } from "./week-todo/week-todo.component";
import { TodoRoutingModule } from "./todo.routing";
import { FormsModule } from "@angular/forms";


@NgModule({
// Chkoun taba3ni
  declarations: [
    TodoComponent,
    WeekTodoComponent
  ],
  // Ch7achti
  imports: [TodoRoutingModule, FormsModule],
  // Chneya n7ab npartgih m3a les modules l'okhrin
  exports: []
})
export class TodoModule {}
