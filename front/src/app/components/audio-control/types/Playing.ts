import { Audio, AudioStatus } from "./AudioControl";

export class Playing {

    private audioStatus = AudioStatus;

    private currentStatus = AudioStatus.paused;

    playPauseIcons: [string, string] = ['assets/icons/play-icon-white.svg', 'assets/icons/pause-icon-white.svg'];

    constructor(private htmlAudio: Audio) {

        this.htmlAudio.audio.addEventListener('ended', () => {
            this.htmlAudio.currentTime = 0;
            this.pause();
        })
    }

    get playPauseCurrentIcon(): string {

        const isPlaying = this.currentStatus === this.audioStatus.playing;

        return this.playPauseIcons[Number(isPlaying)];
    }

    get currentPlayingStatus() {
        return this.currentStatus;
    }


    toggle() {

        const isPlaying = this.currentStatus == this.audioStatus.playing;

        isPlaying ? this.pause() : this.play();
    }


    pause() {

        this.currentStatus = this.audioStatus.paused;
        this.htmlAudio.audio.pause();
    }

    play() {

        this.currentStatus = this.audioStatus.playing;
        this.htmlAudio.audio.play();
    }

}