import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { PodbookResponse } from '@pages/studio/types/studioPage';
import { AudioControlService } from '@services/audio-control/audio-control.service';

@Injectable({
  providedIn: 'root'
})
export class PodbookCommonService {

  constructor(private audioControlService: AudioControlService) { }

  preparePodBookPaginatedData(podbooks: PodbookResponse[]) {

    const { host, port } = environment.apiRequest;

    const preparedPodbooks = podbooks.map(podbook => (
      {
        imgUrl: `${host}:${port}${podbook.bannerImage}`,
        badgeText: podbook.category.name,
        description: podbook.description,
        title: podbook.bannerTitle,
        click: () => this.audioControlService.startCardAudio(`${host}:${port}${podbook.audio}`, podbook.bannerTitle)
      })
    )

    return preparedPodbooks;
  }
}
