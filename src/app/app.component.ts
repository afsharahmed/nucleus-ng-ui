import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import { RestService, StreamItem } from './service/rest.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public configForm: FormGroup;
  title = 'Sahiapps Device Simulator UI';
  data = [ ];
  interval: any;
  intervalSubscription: any;
  // lastReading: number;
  deviceId: string;

  constructor(private formBuilder: FormBuilder, 
            private restService: RestService,
            public datepipe: DatePipe) {
    this.configForm = this.formBuilder.group({
      deviceId: [{ value: '', disabled: false }],
      deviceType: [{ value: '', disabled: false }],
      frequency: [{ value: '', disabled: false }]
    });

    this.interval = interval(1000);
  }

  startStreaming(): void {
    console.log('Starting to stream...');
    this.intervalSubscription = this.interval.subscribe(val =>  {
      let now =this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss.SS');
      let reading = Math.floor(Math.random() * 999);
      let item: StreamItem = { 'deviceId': this.configForm.get('deviceId').value, 
                               'type': 'LOG', 
                               'dateTime': now, 
                               'value': ''+ reading };
      this.data.unshift(item); 
      this.restService.postData(item);
    });
  }

  stopStreaming(): void {
    console.log('Stopped streaming!');
    this.intervalSubscription.unsubscribe();
  }

  submitData(): void {
    console.log('Submitting data to server');
console.log(this.configForm.get('deviceId').value);
  }

  generateId(length: number): string {
    let result           = '';
    // const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 
}
