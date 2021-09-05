import { Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { AudioControlService } from '@services/audio-control.service';
import { AudioComponent } from './types/AudioControl';
import { Mute } from './types/Mute';
import { Playing } from './types/Playing';
import { Repeat } from './types/Repeat';

@Component({
  selector: 'pod-audio-control',
  templateUrl: './audio-control.component.html',
  styleUrls: ['./audio-control.component.scss'],
})
export class AudioControlComponent implements AudioComponent {

  muteInstance = new Mute();
  repeatInstance = new Repeat();
  playingInstance = new Playing();

  audioIsOpen = this.audioControlService.barStatus;

  @HostBinding('class.closed')
  get audioCurrentStatus(){
    return !this.audioControlService.barStatus.value;
  }

  constructor(private audioControlService: AudioControlService){}

  @Output()
  private audioIsOpenEventEmmiter = new EventEmitter();


  closeAudio(){
    this.audioControlService.closeAudioBar();
    this.audioIsOpenEventEmmiter.emit(this.audioIsOpen);
  }
}
