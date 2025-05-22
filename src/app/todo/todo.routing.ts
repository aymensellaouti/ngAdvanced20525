import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { canLeaveGuard } from "../guard/can-leave.guard";
import { TodoComponent } from "./todo/todo.component";

const routes: Route[] = [
    { path: 'todo', component: TodoComponent, canDeactivate:[canLeaveGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
