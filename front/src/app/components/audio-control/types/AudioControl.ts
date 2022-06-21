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


const defineAudioDuration = (audio: HTMLAudioElement, callback: Function) => {
    if (audio.duration === Infinity) {

        audio.currentTime = Number.MAX_SAFE_INTEGER;

        audio.addEventListener('loadedmetadata', function () {
            if (audio.duration == Infinity) {
                audio.currentTime = 1e101;
                audio.ontimeupdate = function () {
                    this.ontimeupdate = () => {
                        return;
                    }
                    audio.currentTime = 0;
                    return callback(audio.duration);
                }
            }
        });
    }
}

export class Audio {

    private htmlAudio = new window.Audio();

    get currentTime() {
        return this.htmlAudio.currentTime
    }

    set currentTime(time: number) {
        this.htmlAudio.currentTime = time
    }

    get audio() {
        return this.htmlAudio;
    }
   
    getDuration(callback: Function) {
        return defineAudioDuration(this.htmlAudio, callback);
    }

    set volume(volme: number) {
        this.audio.volume = volme;
    }

    set source(src: string) {
        this.audio.src = src;
    }
}