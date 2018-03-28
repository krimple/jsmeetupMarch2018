import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {CalculatorComponent} from './calculator.component';
import {CalculatorButtonComponent} from './calculator-button.component';
import {CalculatorEventTypeEnum} from './calculator-event-type.enum';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ CalculatorComponent, CalculatorButtonComponent ]
    })
    .overrideComponent(CalculatorButtonComponent, {
      set: {
       template: '<b>hi</b>'
       }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add two numbers', () => {
    component.accumulator = 10;
    component.current = '12';
    component.keyReceived({ value: '+',
      eventType: CalculatorEventTypeEnum.OPERATION });
    expect(component.accumulator).toBe(22);
  });
});
