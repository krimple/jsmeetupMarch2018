export enum CalculatorEventTypeEnum {
  NUMBER,
  OPERATION,
  DECIMAL_POINT
}

export function CalculatorEventTypeEnumDecorator(constructor: Function) {
  constructor.prototype.CalculatorEventTypeEnum = CalculatorEventTypeEnum;
}
