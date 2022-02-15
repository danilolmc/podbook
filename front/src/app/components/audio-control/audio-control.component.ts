import { Component, ElementRef, EventEmitter, HostBinding, OnDestroy, Output, ViewChild } from '@angular/core';
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
export class AudioControlComponent implements AudioComponent, OnDestroy {

  @ViewChild('range') rangeAudioVolume!: ElementRef<HTMLInputElement>;

  private unsubscribe = new Subject();
  
  private audio =  new Audio();

  volumeInstance = new Volume(this.audio);
  repeatInstance = new Repeat(this.audio);
  playingInstance = new Playing(this.audio);

  audioIsOpen = this.audioControlService.barStatus;

  audioTitle = ''

  @HostBinding('class.closed')
  get audioCurrentStatus() {
    return !this.audioControlService.barStatus.value;
  }

  constructor(private audioControlService: AudioControlService) {

    this.audioControlService.playingStatus.asObservable().pipe(takeUntil(this.unsubscribe)).subscribe(audioStatus => {
      if (audioStatus === AudioStatus.playing) this.playingInstance.pause();
    })

    this.audioControlService.audioData.asObservable().pipe(takeUntil(this.unsubscribe)).subscribe(audio => {
      
      if(!audio.audioUrl) return;

      this.audio.source = audio.audioUrl;
      this.audio.volume = parseFloat(this.rangeAudioVolume.nativeElement.value) / 100;
      this.audioTitle = audio.audioName;
      this.audio.currentTime;

      if (audio.audioUrl.length > 0) {
        this.audioControlService.openAudioBar()
        this.audioIsOpenEventEmmiter.emit(this.audioIsOpen);
      };

      
      setTimeout(() => {
        
        this.playingInstance.play()

      }, 500);
    });
  }

  @Output()
  private audioIsOpenEventEmmiter = new EventEmitter();


  closeAudio() {
    this.audioControlService.closeAudioBar();
    this.audioIsOpenEventEmmiter.emit(this.audioIsOpen);
    this.audio.source = '';
    this.playingInstance.pause();
  }

  changeVolume($event: any) {

    const newVolume = $event.target.value / 100;

    this.volumeInstance.volume = newVolume;

    console.log(this.volumeInstance.volume)
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
