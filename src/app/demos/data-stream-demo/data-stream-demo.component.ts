import { Component, OnInit } from '@angular/core';
import {DataStreamerService} from '../data-streamer.service';

@Component({
  selector: 'app-data-stream-demo',
  template: `
   <ul>
    <li *ngFor="let datum of observations">{{ datum?.value }}</li>
  </ul>
  `,
  styleUrls: ['./data-stream-demo.component.scss']
})
export class DataStreamDemoComponent implements OnInit {

  constructor(private dataStreamService: DataStreamerService) { }
  observations: number;

  ngOnInit() {
    this.dataStreamService.subject.subscribe(
      (data: number) => {
        console.log('got data', data);
        this.observations = data;
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('closed');
      });
  }
}
