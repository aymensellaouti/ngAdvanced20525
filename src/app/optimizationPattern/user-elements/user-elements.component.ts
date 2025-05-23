import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../users.service';
import { NgFor } from '@angular/common';
import { FiboPipe } from '../../pipes/fibo.pipe';




@Component({
    selector: 'app-user-elements',
    templateUrl: './user-elements.component.html',
    styleUrls: ['./user-elements.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgFor, FiboPipe]
})
export class UserElementsComponent {
  @Input() users: User[] = [];

}
