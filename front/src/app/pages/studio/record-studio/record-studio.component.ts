import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AudioStatus } from '@components/audio-control/types/AudioControl';
import { FormFieldComponent } from '@components/form-field/form-field.component';
import { AudioControlService } from '@services/audio-control/audio-control.service';
import { RecordAudioService } from '@services/record-audio/record-audio.service';
import { StudioService } from '@services/studio/studio.service';
import { UserService } from '@services/user/user.service';
import { recordingStatusStratergy } from '@stratergy/StudioPage/studioStratergy';
import { FieldsValidators } from '@typing/fieldsValidators/fieldsValidators';
import { validateFields, validateFile } from 'app/core/validation/validation.utils';
import { first } from 'rxjs/operators';
import { PodbookData, RecordedAudio, RecordingStatus, Studio } from '../types/studioPage';


@Component({
  selector: 'pod-record-studio',
  templateUrl: './record-studio.component.html',
  styleUrls: ['./record-studio.component.scss'],
})
export class RecordStudioComponent implements Studio, OnInit {

  @ViewChild('preview') imageElement !: ElementRef<HTMLImageElement>;

  @ViewChild('previewLabel') previewLabel !: ElementRef<HTMLLabelElement>;

  actionButtonsDisabled = true;

  buttonIsDisabled = false;

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

  private userId!: number;

  loading = false;

  alert: { message: string, type: 'error' | 'warning' | 'success' | '' } = { message: '', type: '' };

  constructor(
    private recordingService: RecordAudioService,
    private audioControlService: AudioControlService,
    private renderer: Renderer2,
    private userService: UserService,
    private studioService: StudioService,
    private router: Router) {
  }

  ngOnInit() {
    this.userService.getUser().pipe(first()).subscribe((user) => {
      this.userId = user!.user_id;
      console.log(user?.user_id)
    })
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

        if (recordedAudio?.audioBlob?.size == 0) return;

        this.actionButtonsDisabled = false
      }

      stop(getRecordedAudio);

    } catch (error: any) {
      this.alert = { type: 'error', message: error.message };
      this.resetMessageBoxInSeconds(4000);
    }
  }

  setImagePreview($event: any) {

    if ($event.target.files.length == 0) {
      this.renderer.removeClass(this.imageElement, 'imagePreview');
      return
    };

    const URLImage = URL.createObjectURL($event.target.files[0]);
    this.renderer.setAttribute(this.imageElement.nativeElement, 'src', URLImage);
    this.renderer.setAttribute(this.imageElement.nativeElement, 'havePreview', 'true');
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

  private getReadyPodbookData(fields: FormFieldComponent[], genericField: HTMLInputElement) {

    const [title, category, description] = fields.map(field => field.value);

    const { audioBlob } = this.audioControlService.audioData.value;

    if (!genericField.files?.length) {
      this.previewLabel.nativeElement.click();
      return { type: 'error', message: 'selecione uma imagem para o banner' };
    }

    let fieldsAreValid = false;

    if (audioBlob) {
      fieldsAreValid = Boolean(validateFields(fields) && validateFile(audioBlob))
    }

    if (!fieldsAreValid) {
      return { type: 'error', message: 'formulário inválido, preencha todos os campos' };
    }

    const audioFile = audioBlob
      ? new File([audioBlob], `audio.mp3`, { lastModified: Date.now(), type: 'audio/mp3' })
      : {} as File;

    const podbookData: PodbookData = {
      user_id: this.userId,
      podbook: {
        bannerImage: genericField.files[0],
        bannerTitle: title,
        description: description,
        category: category,
        audio: audioFile
      }
    }

    return { data: podbookData, type: 'success', msg: '' };
  }

  saveRecordedAudio(fields: FormFieldComponent[], genericField: HTMLInputElement) {

    this.loading = true;

    try {

      const { data, type, message } = this.getReadyPodbookData(fields, genericField);

      if (type === 'error') {
        throw new Error(message);
      }

      if (type === 'success' && data) {

        this.recordingService.uploadPodbook(data)
          .then((data: HttpResponse<any>) => {
            this.alert = { type: 'success', message: data.body.message, }
            this.buttonIsDisabled = true;
            this.resetMessageBoxInSeconds(4000);


            setTimeout(() => {

              this.router.navigate(['podbooks'])
              this.studioService.currentActiveTab.next('podbooks');
            }, 1000)


          })
          .catch(({ error, status }) => {

            if (status === 401) {
              this.audioControlService.closeAudioBar();
              this.userService.logout();
              this.alert = { type: 'error', message: error.message }
              this.router.navigate(['sign-in'])
              return;
            }

            this.alert = { type: 'error', message: error.message }
          })

      }

    } catch (error: any) {
      this.alert = { type: 'error', message: error.message };
      this.resetMessageBoxInSeconds(4000);
    }

    this.loading = false;
  }

  getRecordingStatusClass() {
    return recordingStatusStratergy[this.recordingStatus];
  }

}
