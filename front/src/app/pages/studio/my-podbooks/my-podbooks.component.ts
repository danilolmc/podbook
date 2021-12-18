import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pod-my-podbooks',
  templateUrl: './my-podbooks.component.html',
  styleUrls: ['./my-podbooks.component.scss']
})
export class MyPodbooksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("carregou");
    
  }

}
