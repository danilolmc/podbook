import { Observer } from "rxjs";

type AudioPlayingStatus = 'playing' | 'paused';
type AudioSongStatus = 'muted' | 'unmuted';

export interface AudioDTO {
    status: AudioPlayingStatus | AudioSongStatus,
    repeat: boolean;
}

export enum AudioStatus {
    playing = 'playing',
    paused = 'paused',
    muted = 'muted',
    unmuted = 'unmuted'
}

export interface AudioComponent {

    audioIsOpen: Observer<boolean>,
    closeAudio: Function,
}


export const defineAudioDuration = (audio: HTMLAudioElement, callback: Function) => {
    if (audio.duration === Infinity) {

        audio.currentTime = Number.MAX_SAFE_INTEGER;

        audio.ontimeupdate = () => {

            audio.ontimeupdate = () => { }

            audio.currentTime = 0;

            return callback(audio.duration);
        }
    }
}

export class Audio {

    private htmlAudio = new window.Audio();

    private audioCurrentTime = 0;

    get currentTime() {
        return this.audioCurrentTime
    }

    set currentTime(time: number) {
        this.audioCurrentTime = time
    }

    get audio() {
        return this.htmlAudio;
    }

    set volume(volme: number) {
        this.audio.volume = volme;
    }

    set source(src: string) {
        this.audio.src = src;
    }
}