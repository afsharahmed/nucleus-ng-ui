import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RestService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  sendGetRequest(data: string): void {
    const serverEndpoint = `${this.baseUrl}/stream/consume?d=${data}`;
    const subscription = this.httpClient.get(`${serverEndpoint}`).subscribe((data)=>{}, (err)=>{
      console.log('Error occurred while sending data to server!', err);
      subscription.unsubscribe();
    });
  }

  postData(item: StreamItem): void {
    const serverEndpoint = `${this.baseUrl}/stream/consume`;
    //return this.httpClient.post(`${this.api}/${serverEndpoint}`) as Observable<EdisonAIAlgorithm[]>;
    const subscription = this.httpClient.post(`${serverEndpoint}`, item).subscribe((data)=>{}, (err)=>{
      console.log('Error occurred while sending data to server!', err);
      subscription.unsubscribe();
    });
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

