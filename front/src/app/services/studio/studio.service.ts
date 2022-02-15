import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedPodbookResponse } from '@pages/studio/types/studioPage';
import { UserService } from '@services/user/user.service';
import { PodbookPaginationRequestQueryParams } from '@typing/request/params';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudioService {

    currentActiveTab = new BehaviorSubject<string>('');

    constructor(
      private httpClient: HttpClient,
      private userService: UserService,
      ) { }

    getMyPodbooks({ limit, page = 1 }: PodbookPaginationRequestQueryParams): Observable<any> {
  
      const userId = this.userService.getUserRawData()?.user_id;

      if(!userId){
        throw new Error('Informe o id do usuário');
      }

      const { host, port, url } = environment.apiRequest;
  
      const requestUrl = `${host}:${port}${url}/my-podbooks/${userId}`;
  
      const podbooks = this.httpClient.get<PaginatedPodbookResponse>(requestUrl, { params: { limit, page } })
  
      return podbooks;
    }
}
