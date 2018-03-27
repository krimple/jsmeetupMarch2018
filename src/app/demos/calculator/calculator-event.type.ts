export interface CalculatorEvent {
  value: string | number;
  eventType: 'action' | 'data';
}
