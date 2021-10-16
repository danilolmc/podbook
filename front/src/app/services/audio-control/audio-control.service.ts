import { Injectable } from "@angular/core";
import { RecordedAudio } from "@pages/studio/types/studioPage";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AudioControlService {

    barStatus = new BehaviorSubject(false);

    audioData = new Subject<RecordedAudio>();

    openAudioBar() {
        this.barStatus.next(true);
    }

    closeAudioBar() {
        this.barStatus.next(false);
    }

}