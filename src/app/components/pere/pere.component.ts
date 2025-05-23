import { Component } from '@angular/core';

export interface TestUser {
  id: number;
  email: string;
}

@Component({
  selector: 'app-pere',
  templateUrl: './pere.component.html',
  styleUrls: ['./pere.component.css'],
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
