import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { BrowserCodeReader, BrowserQRCodeReader } from '@zxing/library';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-zxing';
  codeReader: BrowserCodeReader = new BrowserQRCodeReader();
  deviceList: Array<any>;
  selectedDeviceId;

  constructor(){}

  ngOnInit(){
    this.codeReader.getVideoInputDevices()
    .then((videoInputDevices) => {
      this.deviceList = videoInputDevices;
      this.selectedDeviceId = this.deviceList[0].deviceId;

    })
    .catch((err) => {
      console.log('qrcode init error:'+ err);
    });

    this.startScan();
  }

  startScan(){
    this.codeReader.decodeFromInputVideoDevice(this.selectedDeviceId, 'video')
    .then(
      result => {
        console.log(result);
      }
    );
  }
}
