import { Component, EventEmitter, HostBinding, OnDestroy, Output } from '@angular/core';
import { AudioControlService } from '@services/audio-control/audio-control.service';
import { Subject } from 'rxjs';
import { last, take, takeLast, takeUntil } from 'rxjs/operators';
import { Audio, AudioComponent } from './types/AudioControl';
import { Mute } from './types/Mute';
import { Playing } from './types/Playing';
import { Repeat } from './types/Repeat';

@Component({
  selector: 'pod-audio-control',
  templateUrl: './audio-control.component.html',
  styleUrls: ['./audio-control.component.scss'],
})
export class AudioControlComponent implements AudioComponent, OnDestroy {

  private unsubscribe = new Subject();

  muteInstance = new Mute();
  repeatInstance = new Repeat();
  playingInstance = new Playing();

  audioIsOpen = this.audioControlService.barStatus;

  @HostBinding('class.closed')
  get audioCurrentStatus() {
    return !this.audioControlService.barStatus.value;
  }

  constructor(private audioControlService: AudioControlService) {
    this.audioControlService.audioData.asObservable().pipe(takeUntil(this.unsubscribe)).subscribe(audio => {
      Audio.audio.src = audio.audioUrl;
      if (audio.audioUrl.length > 0)
        this.audioControlService.openAudioBar();
    });
  }

  @Output()
  private audioIsOpenEventEmmiter = new EventEmitter();


  closeAudio() {
    this.audioControlService.closeAudioBar();
    this.audioIsOpenEventEmmiter.emit(this.audioIsOpen);
    Audio.audio.src = '';
    this.playingInstance.pause();
  }

  ngOnDestroy(){
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
