import { Component, EventEmitter, Input } from '@angular/core';
import { AudioComponent, AudioStatus } from './types/AudioControl';

@Component({
  selector: 'pod-audio-control',
  templateUrl: './audio-control.component.html',
  styleUrls: ['./audio-control.component.scss']
})
export class AudioControlComponent implements AudioComponent {

  private audioStatus = AudioStatus;

  currentAudioStatus = this.audioStatus.paused;

  audioIsOpen = false;

  repeat = false;

  private audioIsOpenEventEmmiter = new EventEmitter();

  playPauseIcons: [string, string] = ['assets/icons/play-icon-white.svg','assets/icons/pause-icon-white.svg'];

  muteUnmuteIcons: [string, string] = ['assets/icons/muted-icon.svg', 'assets/icons/unmuted-icon.svg'];

  repeatNotRepeatIcons: [string, string] = ['assets/icons/repeat-icon.svg', 'assets/icons/not-repeat-icon.svg'];


  get playPauseCurrentIcon(): string {

    const isPlaying = this.audioStatus.playing === this.currentAudioStatus;

    return this.playPauseIcons[Number(isPlaying)];
  }

  get mutedUnmutedCurrentIcon(): string {

    const isMuted = this.audioStatus.muted === this.currentAudioStatus;

    return this.muteUnmuteIcons[Number(isMuted)];
  }
  
  get repeatNotRepeatCurrentIcon(): string {

    const isToRepeat = this.repeat;

    return this.repeatNotRepeatIcons[Number(isToRepeat)];
  }


  toggleAudio() {

    const isPlaying = this.currentAudioStatus == this.audioStatus.playing;
    
    isPlaying ? this.pause() : this.play();
  }
  
  toggleMute() {
    const isMuted = this.currentAudioStatus == this.audioStatus.muted;

    isMuted ? this.unmute() : this.mute();
  }

  toggleRepeating() {
    this.repeat ? this.disableRepeating() : this.enableRepeating();
  }


  pause(){
    const audiostatus = AudioStatus;

    this.currentAudioStatus = audiostatus.paused;
  }
  
  play(){
    const audiostatus = AudioStatus;
    
    this.currentAudioStatus = audiostatus.playing;
  }
  
  mute(){
    const audiostatus = AudioStatus;

    this.currentAudioStatus = audiostatus.muted;
  }
  
  unmute(){
    const audiostatus = AudioStatus;

    this.currentAudioStatus = audiostatus.unmuted;
  }

  enableRepeating(){
    this.repeat = true;
  }
  
  disableRepeating(){
    this.repeat = false;
  }

  closeAudio(){
    this.audioIsOpen = false;
    this.audioIsOpenEventEmmiter.emit(this.audioIsOpen);
  }
}
