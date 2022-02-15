import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pod-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log(this.steps)
  }

  totalSteps = 1;

  @Input()
  stepsTitles = ['Financiamento', 'Quantidade de parcelas', 'Confirmação'];

  @Input()
  stepsDescriptions: string[] = ['Financie seu carro nessa etapa', 'Escolha em quantas vezes deseja pagar', 'Confirme as informações para concluir'];


  get steps(): { title: string, description: string }[] {
    return this.combineStepsIntoSingleObject();
  }

  private combineStepsIntoSingleObject() {

    return this.stepsTitles.map((title, index: number) => {
      return { title: title || '', description: this.stepsDescriptions[index] || '' };
    })

  }
}
