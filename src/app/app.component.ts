import { Component } from '@angular/core';

@Component({
  selector: 'pod-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'podbook';

  audioBarStatus = 'closed';


  toggleAudioBar(event: Event){
    // event ? this.audioBarStatus = 
  }
}
