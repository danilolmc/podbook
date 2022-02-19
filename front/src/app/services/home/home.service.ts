import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { PodbookResponse } from '@pages/studio/types/studioPage';

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
