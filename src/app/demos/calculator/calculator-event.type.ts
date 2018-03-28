import {CalculatorEventTypeEnum} from './calculator-event-type.enum';

export interface CalculatorEvent {
  value: string | number;
  eventType: CalculatorEventTypeEnum;
}
