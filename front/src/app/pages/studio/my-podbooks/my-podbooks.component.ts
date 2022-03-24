import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardProperties } from '@components/card/types/CardTypes';
import { PodbookCommonService } from '@services/common/common.service';
import { AbstractStudioService } from '@services/studio/studio.service';
import { PaginationMetadata } from '@typing/pagination/pagination';
import { PodbookPaginationRequestQueryParams } from '@typing/request/params';
import { PaginatedPodbookResponse } from '../types/studioPage';

@Component({
  selector: 'pod-my-podbooks',
  templateUrl: './my-podbooks.component.html',
  styleUrls: ['./my-podbooks.component.scss'],
})
export class MyPodbooksComponent implements OnInit {

  my_cards: CardProperties[] = [];
  paginationMetadata = {} as PaginationMetadata;

  requestParams: PodbookPaginationRequestQueryParams = {
    limit: 15,
    page: 1
  }

  constructor(
    private studioService: AbstractStudioService,
    private commonService: PodbookCommonService) { }

  ngOnInit(): void {

    this.studioService.getMyPodbooks(this.requestParams)
      .subscribe((response: PaginatedPodbookResponse) => {

        if (!response.data.length) {
          this.my_cards = [];
          return;
        }

        this.my_cards = this.commonService.preparePodBookPaginatedData(response.data);
        this.paginationMetadata = response.paginationMetadata

      },
      () => { this.my_cards = []; })
  }

}
