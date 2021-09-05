import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioControlComponent } from './audio-control.component';
import { AudioStatus } from './types/AudioControl';
import { Mute } from './types/Mute';
import { Playing } from './types/Playing';
import { Repeat } from './types/Repeat';

describe('AudioControlComponent', () => {
  let component: AudioControlComponent;
  let fixture: ComponentFixture<AudioControlComponent>;

  let playInstance: Playing;
  let mutedInstance: Mute;
  let repeatInstance: Repeat;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudioControlComponent]
    })
      .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(AudioControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    playInstance = component.playingInstance;
    mutedInstance = component.muteInstance;
    repeatInstance = component.repeatInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should play audio', () => {

    playInstance.play();

    const currentIcon = playInstance.playPauseCurrentIcon;

    expect(currentIcon).toBe(playInstance.playPauseIcons[1])
    expect(playInstance.currentPlayingStatus).toBe(AudioStatus.playing);
  })

  it('should pause audio', () => {

    playInstance.pause();

    const currentIcon = playInstance.playPauseCurrentIcon;

    expect(currentIcon).toBe(playInstance.playPauseIcons[0])
    expect(playInstance.currentPlayingStatus).toBe(AudioStatus.paused);

  })

  it('should mute audio', () => {

    mutedInstance.mute();

    const currentIcon = mutedInstance.mutedUnmutedCurrentIcon;

    expect(currentIcon).toBe(mutedInstance.muteUnmuteIcons[0])
    expect(mutedInstance.currentMutedStatus).toBe(AudioStatus.muted);

  })

  it('should unmute audio', () => {

    mutedInstance.unmute();
    
    const currentIcon = mutedInstance.mutedUnmutedCurrentIcon;

    expect(currentIcon).toBe(mutedInstance.muteUnmuteIcons[1])
    expect(mutedInstance.currentMutedStatus).toBe(AudioStatus.unmuted);

  })

  it('should enable repeating', () => {

    repeatInstance.enableRepeating();

    const currentIcon = repeatInstance.repeatNotRepeatCurrentIcon;

    expect(currentIcon).toBe(repeatInstance.repeatNotRepeatIcons[1])
    expect(repeatInstance.shouldRepeat).toBeTruthy();

  })

  it('should disable repeating', () => {

    repeatInstance.disableRepeating();

    const currentIcon = repeatInstance.repeatNotRepeatCurrentIcon;

    expect(currentIcon).toBe(repeatInstance.repeatNotRepeatIcons[0])
    expect(repeatInstance.shouldRepeat).toBeFalsy();

  })
});
