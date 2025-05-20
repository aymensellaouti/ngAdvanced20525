import { CanDeactivateFn } from '@angular/router';
import { TodoComponent } from '../todo/todo/todo.component';

export const canLeaveGuard: CanDeactivateFn<TodoComponent> = (component, currentRoute, currentState, nextState) => {
  if(component.todo.name.trim() || component.todo.content.trim()) {
    return confirm('Are you sure')
  }
  return true;
};
