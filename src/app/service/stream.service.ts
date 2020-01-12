import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StreamService {
  eventSource: EventSource;
    constructor(private _zone: NgZone) { }

    getStreamData() {
      return Observable.create(observer => {
        this.eventSource = new EventSource(`http://localhost:5000/nucleus/v1/stream/demodata`);
        this.eventSource.onmessage = event => {
          this._zone.run(() => { observer.next(event) });
        };
        // eventSource.onopen = event => {
        //   this._zone.run(() => { observer.(event) });
        // };
        this.eventSource.onerror = error => {
          this._zone.run(() => { observer.error(error) });
        };

      });
    }

    stopStreaming() {
      console.log("Stopping stream!!");
      this.eventSource.close();
    }
  }

export interface StreamItem {
  deviceId: string,
  deviceType: string,
  timestamp: string,
  value: string
}

