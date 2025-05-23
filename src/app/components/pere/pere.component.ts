import { Component } from '@angular/core';
import { FilsComponent } from '../fils/fils.component';
import { FormsModule } from '@angular/forms';

export interface TestUser {
  id: number;
  email: string;
}

@Component({
    selector: 'app-pere',
    templateUrl: './pere.component.html',
    styleUrls: ['./pere.component.css'],
    standalone: true,
    imports: [FilsComponent, FormsModule],
})
export class PereComponent {
  user: TestUser = {
    id: 1,
    email: 'admin@gmail.com',
  };
  hobby = 'angular';
  onSendMessageToDad(message: string) {
    alert(message);
  }
  changeUser(email: string) {
    this.user = {
      ...this.user,
      email
    }
  }
}
