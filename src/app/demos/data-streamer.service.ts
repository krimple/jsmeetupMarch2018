import { Injectable } from '@angular/core';
import { tap, scan } from 'rxjs/operators';
import {WebSocketSubject} from 'rxjs/observable/dom/WebSocketSubject';

@Injectable()
export class DataStreamerService {

  public subject: WebSocketSubject<any>;
  constructor() {
    this.subject = new WebSocketSubject('ws://localhost:3000')
    .pipe(
      scan((bufferWindow, data) => {
        return [ ...bufferWindow, data].splice(bufferWindow.length - 10, 10);
      }, []),
      tap((data) => console.log('transformed', data))
    );
  }
}
