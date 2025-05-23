import { Component, computed, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-som',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './som.component.html',
  styleUrl: './som.component.css',
})
export class SomComponent {
  x = signal(3);
  y = signal(5);
  z = computed(() => this.x() + this.y());
  doubleZ= computed(()=> 2 * this.z())
  increment(value: WritableSignal<number>) {
    value.update((x) => x + 1);
  }
  decrement(value: WritableSignal<number>) {
    value.update((x) => x - 1);
  }
}
