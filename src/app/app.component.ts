import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  configForm: FormGroup;
  title = 'Sahiapps Device Simulator UI';
  data = [ ];
  interval: any;
  intervalSubscription: any;
  // lastReading: number;

  constructor(private formBuilder: FormBuilder) {
    this.configForm = this.formBuilder.group({
      deviceId: '',
      deviceType: '',
      frequency: ''
    });

    this.interval = interval(1000);
  }

  startStreaming(): void {
    console.log('Starting to stream...');
    this.intervalSubscription = this.interval.subscribe(val =>  this.data.unshift({'eventTime': ''+(Date.now()), 'text': (100 + val) }));
  }

  stopStreaming(): void {
    console.log('Stopped streaming!');
    this.intervalSubscription.unsubscribe();
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
