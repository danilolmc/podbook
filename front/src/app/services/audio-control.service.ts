import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

 @Injectable({
     providedIn: 'root'
 })
export class AudioControlService{

    barStatus = new BehaviorSubject(false);

    audioData = null;

    openAudioBar(){
        this.barStatus.next(true);
    }

    closeAudioBar(){
        this.barStatus.next(false);
    }

}