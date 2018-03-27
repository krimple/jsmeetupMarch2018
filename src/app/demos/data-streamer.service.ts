import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import {WebSocketSubject} from 'rxjs/observable/dom/WebSocketSubject';

@Injectable()
export class DataStreamerService {

  public subject: WebSocketSubject<any>;
  constructor() {
    this.subject = new WebSocketSubject('ws://localhost:4200');
    this.subject.pipe(
      tap((data) => { console.log('incoming message: ', data); })
    );
  }
}
