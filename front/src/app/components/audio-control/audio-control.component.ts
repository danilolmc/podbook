import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AudioControlService } from '@services/audio-control/audio-control.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Audio, AudioComponent, AudioStatus } from './types/AudioControl';
import { Playing } from './types/Playing';
import { Repeat } from './types/Repeat';
import { Volume } from './types/Volume';

@Component({
  selector: 'pod-audio-control',
  templateUrl: './audio-control.component.html',
  styleUrls: ['./audio-control.component.scss'],
})
export class AudioControlComponent implements AudioComponent, OnDestroy, OnInit {

  @ViewChild('range') rangeAudioVolume!: ElementRef<HTMLInputElement>;

  private unsubscribe = new Subject();

  timer: any = null;

  audio: Audio = {} as Audio;

  audioInformations = {
    duration: 0,
    currentTime: 0
  }

  volumeInstance: Volume = {} as Volume;
  repeatInstance: Repeat = {} as Repeat
  playingInstance: Playing = {} as Playing;

  audioIsOpen = this.audioControlService.barStatus;

  audioTitle = ''

  get audioCurrentBarStatus() {
    return !this.audioControlService.barStatus.value;
  }

  constructor(
    private readonly audioControlService: AudioControlService
  ) { }

  ngOnInit(): void {
    this.initializeAudioControl();
  }

  initializeAudioControl() {
    this.audio = new Audio();
    this.volumeInstance = new Volume(this.audio);
    this.repeatInstance = new Repeat(this.audio);
    this.playingInstance = new Playing(this.audio);

    this.handlePlayingStatus();
    this.handleAudioData();
  }

  @Output()
  readonly audioIsOpenEventEmmiter = new EventEmitter();

  handlePlayingStatus() {
    this.audioControlService.playingStatus.asObservable().pipe(takeUntil(this.unsubscribe)).subscribe(audioStatus => {
      if (audioStatus === AudioStatus.playing) this.playingInstance.pause();
    })
  }

  handleAudioData() {
    this.audioControlService.audioData.asObservable().pipe(takeUntil(this.unsubscribe)).subscribe(audio => {

      if (!audio.audioUrl) return;

      this.audio.source = audio.audioUrl;
      this.audio.volume = parseFloat(this.rangeAudioVolume.nativeElement.value) / 100;
      this.audioTitle = audio.audioName;
      this.audio.currentTime;

      if (audio.audioUrl.length > 0) {
        this.audioControlService.openAudioBar()
        this.audioIsOpenEventEmmiter.emit(this.audioIsOpen);
      };

      this.timeOutToPlay();
    });
  }

  timeOutToPlay() {

    const setCurrentAudioDuration = (value: any) => {
      this.audioInformations = { ...this.audioInformations, duration: value };
    }


    setTimeout(() => {
      this.playingInstance.play()
      this.audio.getDuration(setCurrentAudioDuration)

      this.timer = setInterval(() => {

        this.audioInformations = { ...this.audioInformations, currentTime: this.audio.currentTime };

      }, 1000)

    }, 500);


    setTimeout(() => clearInterval(this.timer), this.audioInformations.duration)
  }

  closeAudio() {
    this.audioControlService.closeAudioBar();
    this.audioIsOpenEventEmmiter.emit(this.audioIsOpen);
    this.audio.source = '';
    this.playingInstance.pause();
  }

  changeVolume($event: any) {

    const newVolume = $event.target.value / 100;
    this.volumeInstance.volume = newVolume;
  }

  toggleVolume() {
    this.volumeInstance.toggle();

    const rangeVolume = String(this.volumeInstance.volume * 100);

    if (this.volumeInstance.currentMutedStatus == AudioStatus.muted) {
      this.rangeAudioVolume.nativeElement.value = '0';
      return;
    }

    this.rangeAudioVolume.nativeElement.value = rangeVolume;

  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
