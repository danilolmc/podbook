import { Component, OnInit } from '@angular/core';
import { CardProperties } from '@components/card/types/CardTypes';
import { ListStatesEnum } from '@enums/styleListComponent/ListStateEnum';
import { PodbookResponse } from '@pages/studio/types/studioPage';
import { AudioControlService } from '@services/audio-control/audio-control.service';
import { PodbookCommonService } from '@services/common/common.service';
import { HomeService } from '@services/home/home.service';

@Component({
  selector: 'pod-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  card = {} as CardProperties;

  listStyle = ListStatesEnum.GRID;

  constructor(
    private homeService: HomeService,
    private commonService: PodbookCommonService
  ) { }

  homeCards: CardProperties[] = [];

  ngOnInit() {

    const recordLimit = 8;

    this.homeService.recentPodbooks(recordLimit).subscribe((podbooks: PodbookResponse[]) => {

      if(!podbooks.length) {
        this.homeCards = []
        return;
      }

      this.homeCards = this.commonService.preparePodBookData(podbooks) || [];

      console.log(podbooks);
      

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
