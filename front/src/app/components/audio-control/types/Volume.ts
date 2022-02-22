import { Audio, AudioStatus } from "./AudioControl";

export class Volume{

    private currentStatus = AudioStatus.unmuted;

    private savedAudioVolume = 0;

    muteUnmuteIcons: [string, string] = ['assets/icons/muted-icon.svg', 'assets/icons/unmuted-icon.svg'];

    constructor(private audio: Audio) { }

    get mutedUnmutedCurrentIcon(): string {

        const isMuted = this.currentStatus == AudioStatus.unmuted;

        return this.muteUnmuteIcons[Number(isMuted)];
    }

    get currentMutedStatus() {
        return this.currentStatus;
    }

    get volume() {
        return this.audio.volume;
    }

    set volume(volume: number) {
        this.audio.volume = volume;
        this.savedAudioVolume = volume;

        this.volume === 0 ? this.mute() : this.unmute();
    }

    mute() {

        this.currentStatus = AudioStatus.muted;
        this.audio.audio.muted = true;
    }

    unmute() {

        this.currentStatus = AudioStatus.unmuted;
        this.audio.audio.muted = false;
        this.audio.audio.volume = this.savedAudioVolume;
    }

    toggle() {
        const isMuted = this.currentStatus == AudioStatus.muted;

        isMuted ? this.unmute() : this.mute();
    }

}