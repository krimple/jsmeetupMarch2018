import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {CalculatorButtonComponent} from './calculator-button.component';
import {DebugElement, ElementRef} from '@angular/core';
import {CalculatorEvent} from './calculator-event.type';
import {By} from '@angular/platform-browser';
import {CalculatorEventTypeEnum} from './calculator-event-type.enum';

describe('Calculator Button Component', () => {
  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let component: CalculatorButtonComponent;
  let debugElement: DebugElement;
  let nativeElement: ElementRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalculatorButtonComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorButtonComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    nativeElement = debugElement.nativeElement;

  });

  it('should create the component', () => {
    expect(fixture).toBeDefined();
    expect(component).toBeDefined();
    expect(debugElement).toBeDefined();
    expect(nativeElement).toBeDefined();
  });

  describe('As a data button', () => {
    // properly wire the component inputs
    beforeEach(async (() => {
      component.value = '9';
      component.action = CalculatorEventTypeEnum.NUMBER;
      fixture.detectChanges();
    }));

    it('should output a key event if wired correctly', fakeAsync(() => {
      let emitted = false, event: CalculatorEvent;
      component.keyEmitted.subscribe(($event: CalculatorEvent) => {
        emitted = true;
        event = $event;
      });
      component.sendClick();
      tick();
      console.dir(event);
      expect(emitted).toBeTruthy();
      expect(event.eventType).toBe(CalculatorEventTypeEnum.NUMBER);
      expect(event.value).toBe('9');
    }));

    it('should contain the right style class', () => {
      const buttonElement = fixture.nativeElement.querySelector('button');
      expect(buttonElement.className).toContain('data');
      expect(buttonElement.innerText).toBe('9');
    });
  });
});
