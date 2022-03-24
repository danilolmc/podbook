import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AudioStatus } from '@components/audio-control/types/AudioControl';
import { AudioControlService } from './audio-control.service';


describe('AudioControlSevice', () => {
    let service: AudioControlService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule]
        });
        service = TestBed.inject(AudioControlService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should open audio bar', () => {

        service.openAudioBar();
        expect(service.barStatus.value).toBe(true);
    });

    it('should close audio bar', () => {

        service.closeAudioBar();
        expect(service.barStatus.value).toBe(false);
    });

    it('should define audioPLayingStatus value', () => {

        service.setAudioPlayingStatus = AudioStatus.paused;
        expect(service.playingStatus.value).toBe(AudioStatus.paused);
    });

    it('should call openAudioBar when start card audio', () => {
        const spyOpenAudioBar = jest.spyOn(service, 'openAudioBar');

        service.startCardAudio('', '');

        expect(spyOpenAudioBar).toHaveBeenCalled();
    })

    it('should define audioData when start card audio', () => {

        const expectedDefinedValue = { audioBlob: {} as Blob, audioUrl: "test", audioName: "test" };

        service.startCardAudio('test', 'test');

        expect(service.audioData.value).toEqual(expectedDefinedValue);
    });

    it('should define playingStatus as playing when start card audio', () => {

        service.startCardAudio('test', 'test');

        expect(service.playingStatus.value).toBe(AudioStatus.playing);
    });
});
