import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RestService {
  baseUrl = environment.baseUrl;

    constructor(private httpClient: HttpClient) {
    }

    postData(item: StreamItem): void {
      const serverEndpoint = `${this.baseUrl}/nucleus/v1/stream/consume`;
      //return this.httpClient.post(`${this.api}/${serverEndpoint}`) as Observable<EdisonAIAlgorithm[]>;
      this.httpClient.post(`${serverEndpoint}`, item).subscribe();
    }

    getDevices(): Observable<Device[]> {
      const serverEndpoint = `${this.baseUrl}/nucleus/v1/devices`;
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

