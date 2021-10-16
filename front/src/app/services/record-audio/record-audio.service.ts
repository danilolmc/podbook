import { Injectable } from '@angular/core';
import { RecordedAudio } from '@pages/studio/types/studioPage';


@Injectable({
  providedIn: 'root'
})
export class RecordAudioService {

  constructor() { }

  private audioChunks: Blob[] = []

  private mediaRecorder = new MediaRecorder(new MediaStream());

  get recorder() {
    return this.mediaRecorder;
  }

  async recordAudio() {

    const userMedia = await navigator.mediaDevices.getUserMedia({ audio: true });

    const mediaRecorder = new MediaRecorder(userMedia);

    
    mediaRecorder.addEventListener('dataavailable', (event: any) => {
      event.data.size > 0 && this.audioChunks.push(event.data);
    });
    
    const start = () => {
      this.audioChunks = [];
      mediaRecorder.start();
    };

    const stop = (callbackFn: Function) => {

      mediaRecorder.addEventListener('stop', () => {

        const audioBlob = new Blob(this.audioChunks);

        const audioUrl = URL.createObjectURL(audioBlob);

        const recordedAudio: RecordedAudio = { audioBlob, audioUrl };

        callbackFn(recordedAudio)
      });

      mediaRecorder.stop();

    };

    return ({ start, stop })
  }

}
