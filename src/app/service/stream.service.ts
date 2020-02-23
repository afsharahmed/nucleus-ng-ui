import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StreamService {
  eventSource: EventSource;
  baseUrl = environment.baseUrl;

    constructor(private _zone: NgZone) { }

    getStreamData() {
      return Observable.create(observer => {
        this.eventSource = new EventSource(`${this.baseUrl}/nucleus/v1/stream/demodata`);
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

