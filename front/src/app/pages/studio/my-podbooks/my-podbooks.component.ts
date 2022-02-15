import { Component, OnInit } from '@angular/core';
import { CardProperties } from '@components/card/types/CardTypes';
import { PodbookCommonService } from '@services/common/common.service';
import { StudioService } from '@services/studio/studio.service';
import { PaginationMetadata } from '@typing/pagination/pagination';
import { PodbookPaginationRequestQueryParams } from '@typing/request/params';
import { PaginatedPodbookResponse } from '../types/studioPage';

@Component({
  selector: 'pod-my-podbooks',
  templateUrl: './my-podbooks.component.html',
  styleUrls: ['./my-podbooks.component.scss']
})
export class MyPodbooksComponent implements OnInit {

  my_cards: CardProperties[] = [];
  paginationMetadata = {} as PaginationMetadata;

  constructor(
    private studioService: StudioService,
    private commonService: PodbookCommonService) {
  }

  ngOnInit(): void {

    const requestParams: PodbookPaginationRequestQueryParams = {
      limit: 15,
      page: 1
    }

    this.studioService.getMyPodbooks(requestParams,).subscribe((podbooks: PaginatedPodbookResponse) => {

      if (!podbooks.data.length) {
        this.my_cards = []
        return;
      }

      this.my_cards = this.commonService.preparePodBookPaginatedData(podbooks.data) || [];
      this.paginationMetadata = podbooks.paginationMetadata

      console.log(podbooks);

    })
  }

}
