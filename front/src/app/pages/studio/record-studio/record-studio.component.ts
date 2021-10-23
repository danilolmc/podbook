import { Component, ViewEncapsulation } from '@angular/core';
import { FormFieldComponent } from '@components/form-field/form-field.component';
import { AudioControlService } from '@services/audio-control/audio-control.service';
import { RecordAudioService } from '@services/record-audio/record-audio.service';
import { recordingStatusStratergy } from '@stratergy/StudioPage/studioStratergy';
import { Podbook, RecordedAudio, RecordingStatus, Studio } from '../types/studioPage';


@Component({
  selector: 'pod-record-studio',
  templateUrl: './record-studio.component.html',
  styleUrls: ['./record-studio.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecordStudioComponent implements Studio {

  modalIsVisible = false

  recordingStatus = RecordingStatus.STOPPED;

  private recorder!: Promise<any>;

  alert: { message: string, type: 'error' | 'warning' | 'success' | '' } = { message: '', type: '' }

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

    try {
      this.recorder = this.recordingService.recordAudio()

      this.recordingStatus = RecordingStatus.RECORDING;

      const { start } = await this.recorder;

      start();

      this.alert = { type: 'success', message: 'recording started' }

    } catch (error: any) {

      this.recordingStatus = RecordingStatus.STOPPED;
      this.alert = { type: 'error', message: error.message }
    }

    this.resetMessageBoxInSeconds(4000)

  }

  private resetMessageBoxInSeconds(seconds: number = 0) {

    setTimeout(() => this.alert = { message: '', type: '' }, seconds);

  }

  async stopRecordingAudio() {

    try {

      this.recordingStatus = RecordingStatus.STOPPED;

      const { stop } = await this.recorder;

      const getRecordedAudio = (recordedAudio: RecordedAudio) => {

        this.audioControlService.audioData.next(recordedAudio);
      }

      await stop(getRecordedAudio);

    } catch (error: any) {
      this.alert = { type: 'error', message: error.message };
      this.resetMessageBoxInSeconds(4000);
    }
  }

  openModal() {
    this.modalIsVisible = true;
  }

  closeModal($event?: any) {

    if($event?.target?.id != 'modal') return;

    this.modalIsVisible = false;
  }

  toggleModal() {
    this.modalIsVisible ? this.closeModal() : this.openModal();
  }

  saveRecordedAudio(fields: FormFieldComponent[]) {

    try {

      const [title, category, description] = fields.map(field => field.value);

      // this.recordingStatus.saveRecordedAudio();

    } catch (error) {

    }


  }

  getRecordingStatusClass() {
    return recordingStatusStratergy[this.recordingStatus];
  }

}
