import { Component } from '@angular/core';
import { recordingStatusStratergy } from '@stratergy/StudioPage/studioStratergy';
import { RecordingStatus, Studio } from './types/studioPage';

@Component({
  selector: 'pod-studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.scss']
})
export class StudioComponent implements Studio {

  recordingStatus = RecordingStatus.STOPPED;

  toggleRecordingStatus(){
    this.recordingStatus = this.recordingStatus == RecordingStatus.STOPPED 
        ? RecordingStatus.RECORDING 
        : RecordingStatus.STOPPED;
  }

  getRecordingStatusClass(){
    return recordingStatusStratergy[this.recordingStatus];
  }
}
