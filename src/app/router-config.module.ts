import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CalculatorComponent} from './demos/calculator/calculator.component';
import {SimpleDemoComponent} from './demos/simple-demo/simple-demo.component';
import {DataStreamDemoComponent} from './demos/data-stream-demo/data-stream-demo.component';

const routes: Routes = [
  { path: '', redirectTo: '/calculator', pathMatch: 'full' },
  { path: 'simpledemo', component: SimpleDemoComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'datastream', component: DataStreamDemoComponent }
];

@NgModule({
 imports: [
   RouterModule.forRoot(routes, {
     useHash: true
   })
 ],
 exports: [
   RouterModule
 ]
})
export class RouterConfigModule { }
