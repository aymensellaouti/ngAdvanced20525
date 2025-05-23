import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TestUser } from '../pere/pere.component';
@Component({
    selector: 'app-fils',
    templateUrl: './fils.component.html',
    styleUrls: ['./fils.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class FilsComponent {
  /**
   *
   * Create event
   */
  @Output() sendMessageToDad = new EventEmitter<string>();

  @Input() user!: TestUser;
  @Input() hobby = '';

  /**
   * Method that emits the data to dad
   */
  sendMessage(): void {
    this.sendMessageToDad.emit('cc papa');
  }
}
