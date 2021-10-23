import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Podbook, RecordedAudio } from '@pages/studio/types/studioPage';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RecordAudioService {


  constructor(private http: HttpClient) { }

  private audioChunks: Blob[] = []

  private mediaRecorder = new MediaRecorder(new MediaStream());

  get recorder() {
    return this.mediaRecorder;
  }

  async recordAudio() {

    const devices = await navigator.mediaDevices.enumerateDevices()

    const audioInputDevices = devices.filter(device => device.kind === 'audioinput');

    if (!(audioInputDevices.length > 0)) throw { message: 'Microfone not connected' };

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


  uploadAudio(podbook: Podbook) {

    const { host, port, url } = environment.apiRequest;

    const requestUrl = `${host}:${port}${url}/podbooks`;

    const validData = podbook.audio && podbook.bannerTitle && podbook.description && podbook.description;

    if (!validData) throw { message: 'No recordings to send' };

    const formData = new FormData();

    const formDataItems = Object.entries(podbook);

    formDataItems.forEach(([key, value]) => {

      formData.append(key, value);
    })

    this.http.post(requestUrl, formData)

  }

}
