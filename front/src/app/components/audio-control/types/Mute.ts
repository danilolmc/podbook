import { Audio, AudioStatus } from "./AudioControl";

export class Mute extends Audio {

    private audioStatus = AudioStatus;

    private currentStatus = AudioStatus.unmuted;

    private audio = Audio.audio;

    muteUnmuteIcons: [string, string] = ['assets/icons/muted-icon.svg', 'assets/icons/unmuted-icon.svg'];

    get mutedUnmutedCurrentIcon(): string {

        const isMuted = this.currentStatus == this.audioStatus.unmuted;

        return this.muteUnmuteIcons[Number(isMuted)];
    }

    get currentMutedStatus() {
        return this.currentStatus;
    }

    mute() {

        this.currentStatus = this.audioStatus.muted;
        this.audio.muted = true;
    }

    unmute() {

        this.currentStatus = this.audioStatus.unmuted;
        this.audio.muted = false;
    }

    toggle() {
        const isMuted = this.currentStatus == this.audioStatus.muted;

        isMuted ? this.unmute() : this.mute();
    }

}