import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedPodbookResponse } from '@pages/studio/types/studioPage';
import { PodbookPaginationRequestQueryParams } from '@typing/request/params';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExploreService {

  constructor(private httpClient: HttpClient) { }

  getPodbooks({ limit, page = 1 }: PodbookPaginationRequestQueryParams): Observable<any> {

    const { host, port, url } = environment.apiRequest;

    const requestUrl = `${host}:${port}${url}/podbooks`;

    const podbooks = this.httpClient.get<PaginatedPodbookResponse>(requestUrl, { params: { limit, page } })

    console.log(podbooks);

    return podbooks;
  }
}
