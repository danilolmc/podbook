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

    audioIsOpen: boolean,
    currentAudioStatus: AudioStatus
    play: Function,
    pause: Function,
    mute: Function,
    unmute: Function,
    closeAudio: Function,
    toggleAudio: Function
}