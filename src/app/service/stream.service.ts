import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RestService {
  eventSource: EventSource;
  baseUrl = environment.baseUrl;

    constructor(private _zone: NgZone, private httpClient: HttpClient) { }

    getStreamData(deviceId: string) {
      return Observable.create(observer => {
        this.eventSource = new EventSource(`${this.baseUrl}/stream/produce/${deviceId}`);
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

    getDevices(): Observable<Device[]> {
      const serverEndpoint = `${this.baseUrl}/device`;
      return this.httpClient.get(`${serverEndpoint}`) as Observable<Device[]>;
    }
  }

  export interface StreamItem {
    deviceId: string,
    type: string,
    dateTime: string,
    value1: string,
    value2: string
  }
  export interface Device {
    id: number,
    typeId: number,
    name: string,
    desc: string
  }

