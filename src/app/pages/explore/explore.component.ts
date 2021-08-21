import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pod-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  call(){
    console.log('explore')
  }

}
