import { Component, EventEmitter, Input } from '@angular/core';
import { AudioComponent, AudioStatus } from './types/AudioControl';

@Component({
  selector: 'pod-audio-control',
  templateUrl: './audio-control.component.html',
  styleUrls: ['./audio-control.component.scss']
})
export class AudioControlComponent implements AudioComponent {

  currentAudioStatus = AudioStatus.paused;

  isPlaying = false;

  audioIsOpen = false;

  private audioIsOpenEventEmmiter = new EventEmitter();

  @Input()
  playPauseIcons: [string, string] = ['', ''];


  get currentIcon(): string {
    return this.playPauseIcons[Number(this.isPlaying)];
  }

  toggleAudio() {

    const audiostatus = AudioStatus;
    
    this.isPlaying ? this.currentAudioStatus = audiostatus.paused : audiostatus.playing;
    this.isPlaying = this.isPlaying ? false : true;
    
  }

  pause(){
    const audiostatus = AudioStatus;

    this.isPlaying = false;
    this.currentAudioStatus = audiostatus.paused;
  }
  
  play(){
    const audiostatus = AudioStatus;
    
    this.isPlaying = true;
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

  closeAudio(){
    this.audioIsOpen = false;
    this.audioIsOpenEventEmmiter.emit(this.audioIsOpen);
  }
}
