import { Component, OnInit } from '@angular/core';
import { CardProperties } from '@components/card/types/CardTypes';
import { ListStatesEnum } from '@enums/styleListComponent/ListStateEnum';
import { PodbookResponse } from '@pages/studio/types/studioPage';
import { AudioControlService } from '@services/audio-control/audio-control.service';
import { HomeService } from '@services/home/home.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'pod-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  card = {} as CardProperties;

  listStyle = ListStatesEnum.GRID;

  constructor(
    private audioControlService: AudioControlService,
    private homeService: HomeService,
  ) { }

  homeCards: CardProperties[] = [];

  ngOnInit() {

    this.homeService.recentPodbooks(8).subscribe((podbooks: PodbookResponse[]) => {

      const { host, port } = environment.fileServer;

      const recentPodbooks = podbooks.map(podbook => (
        {
          imgUrl: `${host}:${port}${podbook.bannerImage}`,
          badgeText: podbook.category,
          description: podbook.description,
          title: podbook.bannerTitle,
          width: '',
          click: () => this.audioControlService.startCardAudio(`${host}:${port}${podbook.audio}`, podbook.bannerTitle)
        })
      )

        console.log(recentPodbooks);
        

      this.homeCards = recentPodbooks;

    });

  }

  call() {
    console.log('asdasd')
  }

  changeStyleList(style: ListStatesEnum) {
    this.listStyle = style;
  }

  callbackTest() {
    alert("funciona")
  }


}
