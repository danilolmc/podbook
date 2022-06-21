import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AudioStatus } from '@components/audio-control/types/AudioControl';
import { FormFieldComponent } from '@components/form-field/form-field.component';
import { SelectComponent } from '@components/select/select.component';
import { validateFields, validateFile } from '@core/validation/validation.utils';
import { AudioControlService } from '@services/audio-control/audio-control.service';
import { RecordAudioService } from '@services/record-audio/record-audio.service';
import { RecordFormService } from '@services/record-form/record-form.service';
import { UserService } from '@services/user/user.service';
import { recordingStatusStratergy } from '@stratergy/StudioPage/studioStratergy';
import { FieldsValidators, FormFieldCommon } from '@typing/fieldsValidators/fieldsValidators';
import { Subject } from 'rxjs';
import { first, takeUntil, tap } from 'rxjs/operators';
import { PodbookData, RecordedAudio, RecordingStatus, SelectOption, Studio } from '../types/studioPage';


@Component({
  selector: 'pod-record-studio',
  templateUrl: './record-studio.component.html',
  styleUrls: ['./record-studio.component.scss'],
})
export class RecordStudioComponent implements Studio, OnInit, OnDestroy {

  private unsubscriber = new Subject();

  @ViewChild('preview') imageElement !: ElementRef<HTMLImageElement>;

  @ViewChild('previewLabel') previewLabel !: ElementRef<HTMLLabelElement>;

  @ViewChild('title') modalInputTitle !: FormFieldComponent;

  @ViewChild('category') selectComponent !: SelectComponent;

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

  categoryOptions: SelectOption[] = [];

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
    private recordFormService: RecordFormService,
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
    this.actionButtonsDisabled = true;

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

        if (recordedAudio?.audioBlob?.size == 0) return;

        this.audioControlService.audioData.next(recordedAudio);

        this.actionButtonsDisabled = false;
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

    this.loadSelectFieldCategories();

    this.modalInputTitle.fieldRef.nativeElement.focus();
  }

  loadSelectFieldCategories() {
    if (this.categoryOptions.length > 0) return;

    this.recordFormService
      .getSelectFormCategories(15)
      .pipe(takeUntil(this.unsubscriber), tap(categories => this.categoryOptions = categories)).subscribe();
      
  }

  closeModal($event?: any) {

    if ($event?.target?.id != 'modal') return;

    this.modalIsVisible = false;

    this.selectComponent.closeCombobox();
  }

  toggleModal() {
    this.modalIsVisible ? this.closeModal() : this.openModal();
  }

  private getReadyPodbookData(fields: FormFieldCommon[], genericField: HTMLInputElement) {

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

  saveRecordedAudio(fields: FormFieldCommon[], genericField: HTMLInputElement) {

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
            this.resetMessageBoxInSeconds(4000);


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

  async repeat() {
    this.audioControlService.audioData.next({} as RecordedAudio);
    await this.startRecordingAudio();
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

}
