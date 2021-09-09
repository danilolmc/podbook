import { Audio, AudioStatus } from "./AudioControl";

export class Mute extends Audio {

    private audioStatus = AudioStatus;

    private currentStatus = AudioStatus.unmuted;

    muteUnmuteIcons: [string, string] = ['assets/icons/muted-icon.svg', 'assets/icons/unmuted-icon.svg'];

    get mutedUnmutedCurrentIcon(): string {

        const isMuted = this.currentStatus == this.audioStatus.unmuted;

        return this.muteUnmuteIcons[Number(isMuted)];
    }

    get currentMutedStatus(){
        return this.currentStatus;
    }

    mute() {

        this.currentStatus = this.audioStatus.muted;
    }
    
    unmute() {
        
        this.currentStatus = this.audioStatus.unmuted;
    }

    toggle() {
        const isMuted = this.currentStatus == this.audioStatus.muted;

        isMuted ? this.unmute() : this.mute();
    }

}