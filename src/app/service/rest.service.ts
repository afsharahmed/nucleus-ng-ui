import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RestService {
    constructor(private httpClient: HttpClient) {
    }

    postData(item: StreamItem): void {
      const serverEndpoint = `http://localhost:5000/nucleus/v1/stream/consume`;
      //return this.httpClient.post(`${this.api}/${serverEndpoint}`) as Observable<EdisonAIAlgorithm[]>;
      this.httpClient.post(`${serverEndpoint}`, item).subscribe();

      
    }
  }

export interface StreamItem {
  deviceId: string,
  type: string,
  dateTime: string,
  value: string
}

