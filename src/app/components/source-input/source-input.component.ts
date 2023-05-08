import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RandomDataGenerator } from 'src/app/generator/random-data-generator';
import { InputHandler } from 'src/app/handlers/input-handler';
import { js2xml } from 'xml-js';

@Component({
  selector: 'app-source-input',
  templateUrl: './source-input.component.html',
  styleUrls: ['./source-input.component.scss'],
})
export class SourceInputComponent implements OnInit {
  nrOfPersons: number = 10;
  @Output() changed: EventEmitter<string> = new EventEmitter<string>();
  srcInput: string | null = null;
  inputHandler: InputHandler;
  dataGenerator: RandomDataGenerator;

  constructor() {
    this.inputHandler = new InputHandler();
    this.dataGenerator = new RandomDataGenerator();
    // this.srcInput = `
    // P|Victoria|Bernadotte
    // T|070-0101010|0459-123456
    // A|Haga Slott|Stockholm|101
    // F|Estelle|2012
    // A|Solliden|Öland|10002
    // F|Oscar|2016
    // T|0702-020202|02-202020
    // P|Joe|Biden
    // A|White House|Washington, D.C
    // `;
    //this.srcInput = '';
  }
  ngOnInit(): void {
    // const event = {
    //   target: {
    //     value: `
    // P|Victoria|Bernadotte
    // T|070-0101010|0459-123456
    // A|Haga Slott|Stockholm|101
    // F|Estelle|2012
    // A|Solliden|Öland|10002
    // F|Oscar|2016
    // T|0702-020202|02-202020
    // P|Joe|Biden
    // A|White House|Washington, D.C
    // `,
    //   },
    // };
    const event = {
      target: {
        value: this.dataGenerator.generateRandomData(this.nrOfPersons)
      }
    }
    this.srcChanged(event);
  }
  srcChanged(event: any) {
    this.srcInput = event.target.value;
    let xml = this.inputHandler.convertStringToXml(event.target.value);


    this.changed.emit(xml);
  }
  nrOfPersonsChanged(event: any) {
    this.nrOfPersons = event.target.value;
    this.srcInput = this.dataGenerator.generateRandomData(this.nrOfPersons);
    let xml = this.inputHandler.convertStringToXml(this.srcInput);
    this.changed.emit(xml);
  }
}
