import { Component, OnInit } from '@angular/core';
import { CardProperties } from '@components/card/types/CardTypes';
import { ListStatesEnum } from '@enums/styleListComponent/ListStateEnum';
import { PaginatedPodbookResponse } from '@pages/studio/types/studioPage';
import { PodbookCommonService } from '@services/common/common.service';
import { ExploreService } from '@services/explore/explore.service';
import { PaginationMetadata } from '@typing/pagination/pagination';
import { PodbookPaginationRequestQueryParams } from '@typing/request/params';


@Component({
  selector: 'pod-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  loading = false;

  listStyle = ListStatesEnum.GRID;

  exploreCards: CardProperties[] = [];

  paginationMetadata = {} as PaginationMetadata;

  readonly requestParams: PodbookPaginationRequestQueryParams = {
    limit: 8,
    page: 1
  }


  constructor(
    private exploreService: ExploreService,
    private commonService: PodbookCommonService) {

  }

  changeStyleList(style: ListStatesEnum) {
    this.listStyle = style;
  }

  ngOnInit(): void {

    this.exploreService
      .getPodbooks(this.requestParams)
      .subscribe((podbooks: PaginatedPodbookResponse) => {

        if (!podbooks.data.length) {
          this.exploreCards = []
          return;
        }

        this.exploreCards = this.commonService.preparePodBookPaginatedData(podbooks.data);
        this.paginationMetadata = podbooks.paginationMetadata;

      })
  }

}
