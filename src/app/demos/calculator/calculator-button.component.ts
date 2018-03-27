import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CalculatorEvent} from './calculator-event.type';

@Component({
  selector: 'app-calc-btn',
  template: `
    <button (click)="sendClick()"
      [ngClass]="{ action: action, data: !action }">
      {{ value }}
    </button>
  `,
  styles: [`
    :host {
      cursor: pointer;
    }
    button {
      font-size: 4em;
      margin-right: 5px;
      margin-bottom: 10px;
      font-family: Courier, serif;
      background-color: lightgray;
      width: 90px;
      height: 90px;
      border: 1px solid black;
    }
    .action {
      background-color: red;
      color: yellow;
    }
    .data {
      background-color: blue;
      color: white;
    }
  `]
})
export class CalculatorButtonComponent {
  @Input() value: string;
  @Input() action: 'action'|null = null;
  @Input() span = 1;
  @Output() keyEmitted: EventEmitter<CalculatorEvent> = new EventEmitter();

  sendClick() {
    // shape of the event
    const event: CalculatorEvent = {
      value: this.value,
      eventType: this.action ? 'action' : 'data'
    };
    this.keyEmitted.emit(event);
  }

}
