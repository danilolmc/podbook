import { Injectable } from '@angular/core';
import { PaginatedPodbookResponse, PodbookResponse } from '@pages/studio/types/studioPage';
import { AudioControlService } from '@services/audio-control/audio-control.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PodbookCommonService {

  constructor(private audioControlService: AudioControlService) { }


  // preparePodBookData(podbooks: PodbookResponse[]) {

  //   const { host, port } = environment.apiRequest;

  //   const preparedPodbooks = podbooks.map(podbook => (
  //     {
  //       imgUrl: `${host}:${port}${podbook.bannerImage}`,
  //       badgeText: podbook.category.name,
  //       description: podbook.description,
  //       title: podbook.bannerTitle,
  //       click: () => this.audioControlService.startCardAudio(`${host}:${port}${podbook.audio}`, podbook.bannerTitle)
  //     })
  //   )

  //   return preparedPodbooks;
  // }


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
