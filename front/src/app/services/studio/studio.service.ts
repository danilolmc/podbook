import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { PaginatedPodbookResponse } from '@pages/studio/types/studioPage';
import { UserService } from '@services/user/user.service';
import { PodbookPaginationRequestQueryParams } from '@typing/request/params';
import { BehaviorSubject, Observable, of } from 'rxjs';


export abstract class AbstractStudioService {

  abstract getMyPodbooks(params: PodbookPaginationRequestQueryParams): Observable<any>;
}

@Injectable({
  providedIn: 'root'
})
export class StudioService implements AbstractStudioService {

  currentActiveTab = new BehaviorSubject<string>('');

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
  ) { }

  getMyPodbooks({ limit, page = 1 }: PodbookPaginationRequestQueryParams): Observable<Error | PaginatedPodbookResponse> {

    const userId = this.userService.getUserRawData()?.user_id;

    if (!userId) {
      return of(new Error('Informe o id do usuário'));
    }

    const { host, port, url } = environment.apiRequest;

    const requestUrl = `${host}:${port}${url}/my-podbooks/${userId}`;

    const podbooks = this.httpClient.get<PaginatedPodbookResponse>(requestUrl, { params: { limit, page } })

    return podbooks;
  }
}
