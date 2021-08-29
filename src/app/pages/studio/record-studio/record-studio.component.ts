import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { recordingStatusStratergy } from '@stratergy/StudioPage/studioStratergy';
import { RecordingStatus, Studio } from '../types/studioPage';

@Component({
  selector: 'pod-record-studio',
  templateUrl: './record-studio.component.html',
  styleUrls: ['./record-studio.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecordStudioComponent implements Studio {

  recordingStatus = RecordingStatus.STOPPED;

  toggleRecordingStatus(){
    this.recordingStatus = this.recordingStatus == RecordingStatus.STOPPED 
        ? RecordingStatus.RECORDING 
        : RecordingStatus.STOPPED;
  }

  getRecordingStatusClass(){
    return recordingStatusStratergy[this.recordingStatus];
  }
  
  
  call(text: string){

    return () => console.log(text)
  }

}
