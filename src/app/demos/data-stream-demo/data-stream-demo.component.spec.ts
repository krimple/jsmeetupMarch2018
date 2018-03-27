import {async, tick, ComponentFixture, TestBed, fakeAsync} from '@angular/core/testing';

import { DataStreamDemoComponent } from './data-stream-demo.component';
import {DataStreamerService} from '../data-streamer.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';

describe('DataStreamDemoComponent', () => {
  let component: DataStreamDemoComponent;
  let fixture: ComponentFixture<DataStreamDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataStreamDemoComponent ],
      providers: [
        { provide: DataStreamerService,
          useValue: {
            subject: Observable.interval(100)
              .do((x) => { console.log(x); })
              .take(3)
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataStreamDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should provide a stream of subject data', fakeAsync(() => {
    component.ngOnInit();
    fixture.detectChanges();
    tick(101);
    expect(component.datum).toBe(0);
    tick(101);
    fixture.detectChanges();
    expect(component.datum).toBe(1);
    tick(101);
    fixture.detectChanges();
    expect(component.datum).toBe(2);
  }));
});
