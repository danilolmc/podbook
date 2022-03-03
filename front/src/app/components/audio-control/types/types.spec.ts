import { Audio, AudioStatus } from './AudioControl';
import { Playing } from './Playing';
import { Repeat } from './Repeat';
import { Volume } from './Volume';


describe('AudioTypes', () => {

    let playInstance: Playing;
    let volumeInstance: Volume;
    const audio = new Audio();


    beforeEach(() => {

        playInstance = new Playing(audio);
        volumeInstance = new Volume(audio);
    });

    it('should create', () => {
        expect(playInstance).toBeDefined();
        expect(volumeInstance).toBeDefined();
        expect(audio).toBeDefined();
    });

    it('should pause audio', () => {

        const pause = jest.spyOn(playInstance, 'pause');
        const { audio: htmlAudio } = audio;
        const pauseHtmlAudio = jest.spyOn(htmlAudio, 'pause');

        playInstance.pause();

        expect(playInstance.currentPlayingStatus).toBe(AudioStatus.paused);
        expect(pause).toHaveBeenCalled();
        expect(pauseHtmlAudio).toHaveBeenCalled();
    })

    it('should play audio', () => {

        const play = jest.spyOn(playInstance, 'play');
        const { audio: htmlAudio } = audio;
        const playHtmlAudio = jest.spyOn(htmlAudio, 'play');

        playInstance.play();

        expect(playInstance.currentPlayingStatus).toBe(AudioStatus.playing);
        expect(play).toHaveBeenCalled();
        expect(playHtmlAudio).toHaveBeenCalled();
    })

    it('should toggle audio to pause', () => {

        playInstance.play();

        playInstance.toggle();

        expect(playInstance.currentPlayingStatus).toBe(AudioStatus.paused);
    })

    it('should toggle audio to play', () => {

        playInstance.pause();

        playInstance.toggle();

        expect(playInstance.currentPlayingStatus).toBe(AudioStatus.playing);
    })
    
    it('should get play status icon when pause', () => {

        playInstance.pause();

        const playIcon = playInstance.playPauseCurrentIcon

        expect(playIcon).toBe(playInstance.playPauseIcons[0]);
    })
    
    it('should get pause status icon when play', () => {

        playInstance.play();

        const pauseIcon = playInstance.playPauseCurrentIcon

        expect(pauseIcon).toBe(playInstance.playPauseIcons[1]);
    })

    
    it('should get unmuted icon', () => {
        volumeInstance.unmute();

        const mutedicon = volumeInstance.mutedUnmutedCurrentIcon

        expect(mutedicon).toBe(volumeInstance.muteUnmuteIcons[1])
    })

    it('should get muted icon', () => {
        volumeInstance.mute();

        const unmutedicon = volumeInstance.mutedUnmutedCurrentIcon

        expect(unmutedicon).toBe(volumeInstance.muteUnmuteIcons[0])
    })

    it('should mute audio volume', () => {
        volumeInstance.mute();

        expect(volumeInstance.currentMutedStatus).toBe(AudioStatus.muted);
    })

    it('should unmute audio volume', () => {
        volumeInstance.unmute();

        expect(volumeInstance.currentMutedStatus).toBe(AudioStatus.unmuted);
    })

    it('should toggle unmute audio volume to muted', () => {
        volumeInstance.unmute();

        volumeInstance.toggle();

        expect(volumeInstance.currentMutedStatus).toBe(AudioStatus.muted);
    })

    it('should toggle mute audio volume to unmuted', () => {
        volumeInstance.mute();

        volumeInstance.toggle();

        expect(volumeInstance.currentMutedStatus).toBe(AudioStatus.unmuted);
    })

    it('should mute volume when set audio to zero', () => {

        volumeInstance.volume = 0;

        expect(volumeInstance.currentMutedStatus).toBe(AudioStatus.muted);

    })

    it('should unmute volume when set audio greater than zero', () => {

        volumeInstance.volume = 1;

        expect(volumeInstance.currentMutedStatus).toBe(AudioStatus.unmuted);

    })
});