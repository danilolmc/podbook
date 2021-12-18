import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudioService {

    currentActiveTab = new BehaviorSubject<string>('');

}
