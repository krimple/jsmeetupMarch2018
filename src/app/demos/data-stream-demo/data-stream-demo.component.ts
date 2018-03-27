import { Component, OnInit } from '@angular/core';
import {DataStreamerService} from '../data-streamer.service';

@Component({
  selector: 'app-data-stream-demo',
  template: `{{ datum }}`,
  styleUrls: ['./data-stream-demo.component.scss']
})
export class DataStreamDemoComponent implements OnInit {

  constructor(private dataStreamService: DataStreamerService) { }
  datum: number;

  ngOnInit() {
    this.dataStreamService.subject.subscribe(
      (data: number) => {
        console.log('got data', data);
        this.datum = data;
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('closed');
      });
  }
}
