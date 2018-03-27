import {Component, OnInit} from '@angular/core';
import {CalculatorEvent} from './calculator-event.type';

import has from 'lodash/has';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: [ './calculator.component.scss' ],
})
export class CalculatorComponent {
  static binaryOperations = ['+', '-', '*', '/'];

  layout = [
    [
      { value: 'AC', action: true },
      { value: 'CE', action: true },
      { value: 'M+', action: true },
      { value: 'MR', action: true }
    ],
    [
      { value: 7 },
      { value: 8 },
      { value: 9 },
      { value: '*', action: true }
    ],
    [
      { value: 4 },
      { value: 5 },
      { value: 6 },
      { value: '/', action: true}
    ],
    [
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: '+', action: true }
    ],
    [
      { value: 0 },
      { value: '.', action: true },
      { value: '=', action: true, span: 2 },
      { value: '+', action: true }
    ]
  ];

  accumulator = 0;
  current = '';
  lastAction: string;
  memory: 0;

  keyReceived(event: CalculatorEvent) {
    console.log('received event', event.value, event.eventType);
    if (event.eventType === 'action') {
      this.handleAction(event);
    } else {
      this.handleAccumulate(event);
    }
  }

  private handleAction(event: CalculatorEvent) {
    const currentValue = +this.current;
    switch (event.value) {
      case '*':
        this.accumulator = this.accumulator * currentValue;
        this.current = '';
        break;
      case '/':
        this.accumulator = this.accumulator / currentValue;
        this.current = '';
        break;
      case '+':
        this.accumulator = this.accumulator + currentValue;
        this.current = '';
        break;
      case '-':
        this.accumulator = this.accumulator - currentValue;
        this.current = '';
        break;
      case '=':
        if (has(CalculatorComponent.binaryOperations, event.value)) {
          return handleAction({value: this.lastAction});
        } else {
          this.accumulator = +this.current;
          this.current = '';
        }
        break;
      case 'AC':
        this.accumulator = 0;
        this.current = '';
        break;
      case 'CE':
        this.accumulator = 0;
        break;
      case 'M+':
        this.memory = this.memory + (+this.current);
        break;
      case 'MC':
        this.memory = 0;
        break;
       default:
        console.log('unknown event', event.eventType, event.value);
    }
    this.lastAction = event.value;
  }

  private handleAccumulate(event: CalculatorEvent) {
    this.current = this.current + event.value;
  }

  clear() {
    this.accumulator = 0;
    this.current = 0;
  }

}
