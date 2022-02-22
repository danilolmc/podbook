import { AudioStatus } from "@components/audio-control/types/AudioControl";
import { RecordedAudio } from "@pages/studio/types/studioPage";
import { BehaviorSubject, of } from "rxjs";

export const AudioControlServiceStub = {

    barStatus: new BehaviorSubject(false),
    audioData: new BehaviorSubject<RecordedAudio>({} as RecordedAudio),
    playingStatus: new BehaviorSubject(AudioStatus.paused),

    set AudioPlayingStatus(audioStatus: AudioStatus) {
        this.playingStatus.next(audioStatus)
    },

    openAudioBar: function () { this.barStatus.next(true) },
    closeAudioBar: function () { this.barStatus.next(false) },
    startCardAudio: (audioUrl: string, audioName: string) => { }
}
