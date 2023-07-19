import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-counter-page',
  templateUrl: './counter-page.component.html',
  styleUrls: ['./counter-page.component.css'],
})
export class CounterPageComponent {
  public counter = signal(10);

  //propiedad computada solo lectura no modificable
  // solo cambia cuando counter se modifica
  public squareCounter = computed(() => this.counter() * this.counter());

  increaseBy(value: number) {
    // this.counter.set(this.counter() +value)
    this.counter.update((current) => current + value);
  }


}
