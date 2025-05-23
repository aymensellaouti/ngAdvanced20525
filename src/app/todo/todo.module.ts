import { NgModule } from "@angular/core";
import { TodoComponent } from "./todo/todo.component";
import { WeekTodoComponent } from "./week-todo/week-todo.component";
import { TodoRoutingModule } from "./todo.routing";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";


@NgModule({
    // Ch7achti
    imports: [TodoRoutingModule, FormsModule, CommonModule, TodoComponent, WeekTodoComponent],
    // Chneya n7ab npartgih m3a les modules l'okhrin
    exports: [],
    // Les dépendances
    providers: []
})
export class TodoModule {}
