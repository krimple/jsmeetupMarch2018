import {Component, } from '@angular/core';
import {CalculatorEvent} from './calculator-event.type';
import {CalculatorEventTypeEnum, CalculatorEventTypeEnumDecorator} from './calculator-event-type.enum';
import {has} from 'lodash';

@CalculatorEventTypeEnumDecorator
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: [ './calculator.component.scss' ],
})
export class CalculatorComponent {
  static binaryOperations = ['+', '-', '*', '/'];

  layout = [
    [
      { value: 'AC', action: CalculatorEventTypeEnum.OPERATION},
      { value: 'CE', action: CalculatorEventTypeEnum.OPERATION},
      { value: 'M+', action: CalculatorEventTypeEnum.OPERATION},
      { value: 'MR', action: CalculatorEventTypeEnum.OPERATION}
    ],
    [
      { value: 7, action: CalculatorEventTypeEnum.NUMBER},
      { value: 8, action: CalculatorEventTypeEnum.NUMBER},
      { value: 9, action: CalculatorEventTypeEnum.NUMBER},
      { value: '*', action: CalculatorEventTypeEnum.OPERATION}
    ],
    [
      { value: 4, action: CalculatorEventTypeEnum.NUMBER},
      { value: 5, action: CalculatorEventTypeEnum.NUMBER},
      { value: 6, action: CalculatorEventTypeEnum.NUMBER},
      { value: '/', action: CalculatorEventTypeEnum.OPERATION}
    ],
    [
      { value: 1, action: CalculatorEventTypeEnum.NUMBER},
      { value: 2, action: CalculatorEventTypeEnum.NUMBER},
      { value: 3, action: CalculatorEventTypeEnum.NUMBER},
      { value: '+', action: CalculatorEventTypeEnum.OPERATION}
    ],
    [
      { value: 0, action: CalculatorEventTypeEnum.NUMBER},
      { value: '.', action: CalculatorEventTypeEnum.DECIMAL_POINT},
      { value: '=', action: CalculatorEventTypeEnum.OPERATION, span: 'double' }
    ]
  ];

  CalculatorEventTypeEnum: typeof  CalculatorEventTypeEnum = CalculatorEventTypeEnum;
  accumulator = 0;
  current = '';
  lastAction: CalculatorEvent;
  memory = 0;

  keyReceived(event: CalculatorEvent) {
    console.log('received event', event.value, event.eventType);
    switch (event.eventType) {
    case CalculatorEventTypeEnum.OPERATION:
      this.handleAction(event);
      break;
    case CalculatorEventTypeEnum.NUMBER:
      this.handleAccumulate(event);
      break;
    case CalculatorEventTypeEnum.DECIMAL_POINT:
      this.handleDecimal(event);
      break;
    }
  }

  private handleAction(event: CalculatorEvent) {
    const currentValue = +this.current;
    switch (event.value) {
      case '*':
      case '/':
      case '+':
      case '-':
        // i feel so evil
        this.accumulator = eval(this.accumulator + event.value +  currentValue);
        this.clearCurrent();
        break;
      case '=':
        if (this.lastAction &&
            has(CalculatorComponent.binaryOperations, this.lastAction.value)) {
          this.handleAction({
            value: this.lastAction.value,
            eventType: CalculatorEventTypeEnum.OPERATION });
          break;
        } else {
          this.accumulator = +this.current;
          this.clearCurrent();
          break;
        }
      case 'AC':
        this.accumulator = 0;
        this.clearCurrent();
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
    this.lastAction = event;
  }

  private clearCurrent() {
    this.current = '';
  }

  private handleAccumulate(event: CalculatorEvent) {
    const numericValue = +event.value;
    if (isNaN(numericValue)) {
      this.current = 'INVALID NUMBER';
      return;
    }

    this.current = this.current + event.value;
  }

  private handleDecimal(event: CalculatorEvent) {
    if (typeof this.current === 'string' && this.current.indexOf('.') === -1) {
      this.current = this.current + '.';
    }
  }

  clear() {
    this.accumulator = 0;
    this.current = '0';
  }

}
