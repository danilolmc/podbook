import { Component, ViewEncapsulation } from '@angular/core';
import { AudioControlService } from '@services/audio-control/audio-control.service';
import { RecordAudioService } from '@services/record-audio/record-audio.service';
import { recordingStatusStratergy } from '@stratergy/StudioPage/studioStratergy';
import { RecordedAudio, RecordingStatus, Studio } from '../types/studioPage';


@Component({
  selector: 'pod-record-studio',
  templateUrl: './record-studio.component.html',
  styleUrls: ['./record-studio.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecordStudioComponent implements Studio {

  recordingStatus = RecordingStatus.STOPPED;

  private recorder = this.recordingService.recordAudio();

  constructor(
    private recordingService: RecordAudioService,
    private audioControlService: AudioControlService) {
  }

  toggleRecordingStatus() {

    this.recordingStatus == RecordingStatus.STOPPED
      ? this.startRecordingAudio()
      : this.stopRecordingAudio();
  }

  async startRecordingAudio() {
    this.recordingStatus = RecordingStatus.RECORDING;

    const { start } = await this.recorder;

    start();
  }

  async stopRecordingAudio() {

    this.recordingStatus = RecordingStatus.STOPPED;

    const { stop } = await this.recorder;

    const getRecordedAudio = (recordedAudio: RecordedAudio) => {

      this.audioControlService.audioData.next(recordedAudio);
    }

    await stop(getRecordedAudio);
  }

  getRecordingStatusClass() {
    return recordingStatusStratergy[this.recordingStatus];
  }


  call(text: string) {

    return () => console.log(text)
  }

}
