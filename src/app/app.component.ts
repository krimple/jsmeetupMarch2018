import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Component Demos</h1>
    <a routerLink="/calculator" routerLinkActive="selected">Calculator</a> |
    <a routerLink="/simpledemo" routerLinkActive="selected">Simple Demo</a> |
    <a routerLink="/datastream" routerLinkActive="selected">Data Stream Demo</a>
    <hr/>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
