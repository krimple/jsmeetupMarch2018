import { Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {CalculatorEvent} from './calculator-event.type';
import {CalculatorEventTypeEnum, CalculatorEventTypeEnumDecorator} from './calculator-event-type.enum';

@CalculatorEventTypeEnumDecorator
@Component({
  selector: 'app-calc-btn',
  template: `
    <button (click)="sendClick()"
      [ngClass]="{ action: action === CalculatorEventTypeEnum.OPERATION,
                   data: action !== CalculatorEventTypeEnum.OPERATION,
                   single: span === 'single',
                   double: span === 'double'}">
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
    .single {
      width: 90px;
    }
    .double {
      width: 188px;
    }
  `]
})
export class CalculatorButtonComponent {
  @Input() value: string;
  @Input() action: CalculatorEventTypeEnum;
  @Input() span:  'single' | 'double' = 'single';
  @Output() keyEmitted: EventEmitter<CalculatorEvent> = new EventEmitter();

  CalculatorEventTypeEnum: typeof  CalculatorEventTypeEnum = CalculatorEventTypeEnum;

  sendClick() {
    // shape of the event
    const event: CalculatorEvent = {
      value: this.value,
      eventType: this.action
    };
    this.keyEmitted.emit(event);
  }
}
