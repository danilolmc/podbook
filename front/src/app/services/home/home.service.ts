import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PodbookResponse } from '@pages/studio/types/studioPage';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  constructor(private httpClient: HttpClient) { }

  recentPodbooks(limit: number) {
    const { host, port, url } = environment.apiRequest;

    const requestUrl = `${host}:${port}${url}/recents`

    const recentPodbooks = this.httpClient.get<PodbookResponse[]>(requestUrl, { params: { limit } })

    return recentPodbooks;
  }
}
