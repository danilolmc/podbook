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

export abstract class Audio{

    static audio = new window.Audio();

    abstract toggle(): void
}