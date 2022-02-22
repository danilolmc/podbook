import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

interface SelectOption {
  cat_id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecordFormService {

  constructor(private httpCLient: HttpClient) { }

  getSelectFormCategories(recordAmountLimit: number): Observable<SelectOption[]> {

    const { host, port, url } = environment.apiRequest;

    const requestUrl = `${host}:${port}${url}/categories`;

    const categories = this.httpCLient.get<SelectOption[]>(requestUrl, { params: { recordAmountLimit } })

    return categories;
  }
}
