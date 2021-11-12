import { Component, ElementRef, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { AudioStatus } from '@components/audio-control/types/AudioControl';
import { FormFieldComponent } from '@components/form-field/form-field.component';
import { AudioControlService } from '@services/audio-control/audio-control.service';
import { RecordAudioService } from '@services/record-audio/record-audio.service';
import { recordingStatusStratergy } from '@stratergy/StudioPage/studioStratergy';
import { FieldsValidators } from '@typing/fieldsValidators/fieldsValidators';
import { Podbook, RecordedAudio, RecordingStatus, Studio } from '../types/studioPage';


@Component({
  selector: 'pod-record-studio',
  templateUrl: './record-studio.component.html',
  styleUrls: ['./record-studio.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecordStudioComponent implements Studio {

  @ViewChild('preview') imageElement !: ElementRef<HTMLImageElement>;

  actionButtonsDisabled = true;

  modalFieldsValidators: FieldsValidators = {
    
    title: [{
      validationName: 'required',
      validationErrorMessage: 'Campo obrigatório'
    }],
    category: [{
      validationName: 'required',
      validationErrorMessage: 'Campo obrigatório'
    }],
    description: [{
      validationName: 'required',
      validationErrorMessage: 'Campo obrigatório'
    }],
  };

  modalIsVisible = false

  recordingStatus = RecordingStatus.STOPPED;

  private recorder!: Promise<any>;

  alert: { message: string, type: 'error' | 'warning' | 'success' | '' } = { message: '', type: '' };

  constructor(
    private recordingService: RecordAudioService,
    private audioControlService: AudioControlService,
    private renderer: Renderer2) {
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

      this.audioControlService.setAudioPlayingStatus = AudioStatus.playing;

      this.alert = { type: 'success', message: 'recording started' }

    } catch (error: any) {

      this.recordingStatus = RecordingStatus.STOPPED;
      this.alert = { type: 'error', message: error.message }
    }

    this.resetMessageBoxInSeconds(4000);

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
        this.actionButtonsDisabled = false
      }

      await stop(getRecordedAudio);

    } catch (error: any) {
      this.alert = { type: 'error', message: error.message };
      this.resetMessageBoxInSeconds(4000);
    }
  }

  setImage($event: any) {


    if ($event.target.files.length == 0) {
      this.renderer.removeClass(this.imageElement, 'imagePreview');
      return
    };

    const URLImage = URL.createObjectURL($event.target.files[0]);
    this.renderer.setAttribute(this.imageElement.nativeElement, 'src', URLImage);
    this.renderer.setAttribute(this.imageElement.nativeElement,'havePreview', 'true');
  }

  openModal() {
    this.modalIsVisible = true;
  }

  closeModal($event?: any) {

    if ($event?.target?.id != 'modal') return;

    this.modalIsVisible = false;
  }

  toggleModal() {
    this.modalIsVisible ? this.closeModal() : this.openModal();
  }

  saveRecordedAudio(fields: FormFieldComponent[]) {

    try {

      const audioData = new FormData();

      const [title, category, description] = fields.map(field => field.value);

      // const audioBlob = this.audioControlService.audioData.va

      // this.recordingStatus.saveRecordedAudio();

    } catch (error) {

    }


  }

  getRecordingStatusClass() {
    return recordingStatusStratergy[this.recordingStatus];
  }

}
