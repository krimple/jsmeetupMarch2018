import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleDemoComponent } from './simple-demo/simple-demo.component';
import { CalculatorComponent } from './calculator/calculator.component';
import {CalculatorModule} from './calculator/calculator.module';
import { DataStreamerService } from './data-streamer.service';
import { DataStreamDemoComponent } from './data-stream-demo/data-stream-demo.component';

@NgModule({
  imports: [
    CommonModule,
    CalculatorModule
  ],
  declarations: [SimpleDemoComponent, DataStreamDemoComponent],
  providers: [DataStreamerService]
})
export class DemosModule { }
