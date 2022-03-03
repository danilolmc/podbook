import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AudioControlServiceStub } from '@mocks/audio-control-component/audio-control-component.mocks';
import { AudioControlService } from '@services/audio-control/audio-control.service';
import { AudioControlComponent } from './audio-control.component';
import { AudioStatus, defineAudioDuration } from './types/AudioControl';
import { Playing } from './types/Playing';
import { Repeat } from './types/Repeat';
import { Volume } from './types/Volume';


describe('AudioControlComponent', () => {
  let component: AudioControlComponent;
  let fixture: ComponentFixture<AudioControlComponent>;
  let audioControlService: AudioControlService;

  let playInstance: Playing;
  let mutedInstance: Volume;
  let repeatInstance: Repeat;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudioControlComponent],
      providers: [
        {
          provide: AudioControlService,
          useValue: AudioControlServiceStub
        }
      ]
    })
      .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(AudioControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    playInstance = component.playingInstance;
    mutedInstance = component.volumeInstance;
    repeatInstance = component.repeatInstance;
    audioControlService = TestBed.inject(AudioControlService);
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

  it('should close audioBar when close audio', () => {

    audioControlService.openAudioBar();

    component.closeAudio();

    expect(component.audioIsOpen.value).toBeFalsy();

  })

  it('should emit audioBar status when close audio', () => {

    const spyAudioIsOpenEventEmmiter = jest.spyOn(component.audioIsOpenEventEmmiter, 'emit');

    audioControlService.openAudioBar();

    component.closeAudio();

    expect(spyAudioIsOpenEventEmmiter).toHaveBeenCalledWith(component.audioIsOpen);

  });

  it('should pause audio when close audio', () => {

    const spyPlayingInstancePause = jest.spyOn(component.playingInstance, 'pause');

    audioControlService.setAudioPlayingStatus = AudioStatus.playing;

    component.closeAudio();

    expect(spyPlayingInstancePause).toHaveBeenCalled();
    expect(component.playingInstance.currentPlayingStatus).toBe(AudioStatus.paused);

  });

  it('should clear audio source when close audio', () => {

    component.closeAudio();

    expect(component.audio.source).toBeUndefined();

  });


  it('should call handlePlayingStatus handleAudioData when initialize', () => {

    const initializeAudioControl = jest.spyOn(component, 'initializeAudioControl');
    const handlePlayingStatus = jest.spyOn(component, 'handlePlayingStatus');
    const handleAudioData = jest.spyOn(component, 'handleAudioData');

    component.ngOnInit();

    expect(initializeAudioControl).toHaveBeenCalled();
    expect(handlePlayingStatus).toHaveBeenCalled();
    expect(handleAudioData).toHaveBeenCalled();
  });

  it('should pause audio when is playing', done => {

    audioControlService.setAudioPlayingStatus = AudioStatus.playing;

    component.handlePlayingStatus();

    done();

    expect(playInstance.currentPlayingStatus).toBe(AudioStatus.paused);
    expect(audioControlService.playingStatus.value).toBe(AudioStatus.paused);
  })
});
