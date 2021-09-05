import { Audio, AudioStatus } from "./AudioControl";

export class Playing extends Audio {

    private audioStatus = AudioStatus;

    private currentStatus = AudioStatus.playing

    playPauseIcons: [string, string] = ['assets/icons/pause-icon-white.svg','assets/icons/play-icon-white.svg'];

    get playPauseCurrentIcon(): string {

        const isPlaying = this.currentStatus === this.audioStatus.playing;

        return this.playPauseIcons[Number(isPlaying)];
    }

    get currentPlayingStatus(){
        return this.currentStatus;
    }


    toggle() {

        const isPlaying = this.currentStatus == this.audioStatus.playing;

        isPlaying ? this.pause() : this.play();
    }


    pause() {

        this.currentStatus = this.audioStatus.paused;
    }
    
    play() {
        
        this.currentStatus = this.audioStatus.playing;
    }

}