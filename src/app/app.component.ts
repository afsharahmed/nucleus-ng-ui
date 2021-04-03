import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { interval } from 'rxjs';
import { Device, RestService, StreamItem } from './service/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public configForm: FormGroup;
  title = 'Sahiapps Device Simulator UI';

  devices: Device[] = [];
  selectedDeviceId: number;
  selectedDevice: Device;
  streamingStarted = false;
  data = [];
  interval: any;
  intervalSubscription: any;

  ngOnInit() {
    this.restService.getDevices().subscribe(devices => {
      this.devices = devices;
      this.selectedDevice = this.devices[0];
      this.selectedDeviceId = this.selectedDevice.id;
    });
  }

  constructor(private formBuilder: FormBuilder, private restService: RestService, public datepipe: DatePipe) {
    this.configForm = this.formBuilder.group({
      devices: [{ value: this.selectedDeviceId, disabled: false }],
      deviceType: [{ value: '', disabled: false }],
      frequency: [{ value: '', disabled: false }]
    });

    this.interval = interval(1000);
  }

  startStreaming(): void {
    this.setStreamingStarted(true);
    console.log('Starting to stream...');

    this.intervalSubscription = this.interval.subscribe(val =>  {
      let now =this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss.SS');
      let reading1 = Math.floor(Math.random() * 999);
      let reading2 = Math.floor(Math.random() * 999);
      let item: StreamItem = { 'deviceId': this.selectedDevice.id+'',//+'-'+this.selectedDevice.name, 
                               'type': 'LOG', 
                               'dateTime': now, 
                               'value1': ''+ reading1,
                               'value2': 'null'
                              //  'value2': ''+ reading2
                              };
      this.data.unshift(item); 
      // this.restService.sendGetRequest(this.selectedDevice.id+"_"+now+"_LOG_"+reading1+"_"+reading2);
      this.restService.sendGetRequest(this.selectedDevice.id+"_"+now+"_LOG_"+reading1);

      // this.restService.postData(item);
    });
  }

  stopStreaming(): void {
    this.setStreamingStarted(false);
    console.log('Stopped streaming!');
    this.intervalSubscription.unsubscribe();
  }

  clearData(): void {
    this.data = [];
  }

  onDeviceChange(deviceId) {
    this.selectedDeviceId = deviceId;
    this.selectedDevice = this.devices.find(device => {return device.id == deviceId});
  }

  setStreamingStarted(isStarted: boolean) {
    this.streamingStarted = isStarted;
    const selectInput = this.configForm.controls['devices'];
    isStarted ? selectInput.disable() : selectInput.enable();
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
