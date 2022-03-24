import { Injectable } from '@angular/core';
import { PodbookResponse } from '@pages/studio/types/studioPage';
import { AudioControlService } from '@services/audio-control/audio-control.service';

@Injectable({
  providedIn: 'root'
})
export class PodbookCommonService {

  constructor(private audioControlService: AudioControlService) { }

  preparePodBookPaginatedData(podbooks: PodbookResponse[]) {

    const preparedPodbooks = podbooks.map(podbook => (
      {
        imgUrl: podbook?.bannerImage,
        badgeText: podbook?.category?.name || '',
        description: podbook?.description || '',
        title: podbook?.bannerTitle || '' ,
        click: () => this.audioControlService.startCardAudio(podbook.audio, podbook.bannerTitle)
      })
    )

    return preparedPodbooks;
  }
}
