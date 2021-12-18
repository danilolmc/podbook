import { Injectable } from "@angular/core";
import { AudioStatus } from "@components/audio-control/types/AudioControl";
import { RecordedAudio } from "@pages/studio/types/studioPage";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AudioControlService {

    barStatus = new BehaviorSubject(false);

    audioData = new BehaviorSubject<RecordedAudio>({} as RecordedAudio);

    playingStatus = new BehaviorSubject(AudioStatus.paused);

    set setAudioPlayingStatus(audioStatus: AudioStatus) {
        this.playingStatus.next(audioStatus);
    }

    openAudioBar() {
        this.barStatus.next(true);
    }

    closeAudioBar() {
        this.barStatus.next(false);
    }

    startCardAudio(audioUrl: string, audioName: string) {
        this.audioData.next({ audioBlob: {} as Blob, audioUrl, audioName })
        this.openAudioBar();
        this.playingStatus.next(AudioStatus.playing);
    }


}