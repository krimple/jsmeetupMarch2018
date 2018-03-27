import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalculatorButtonComponent} from './calculator-button.component';
import {CalculatorComponent} from './calculator.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CalculatorButtonComponent,
    CalculatorComponent
  ],
  exports: [
    CalculatorComponent
  ]
})
export class CalculatorModule { }
