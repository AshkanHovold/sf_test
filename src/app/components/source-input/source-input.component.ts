import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InputHandler } from 'src/app/handlers/input-handler';
import { js2xml } from 'xml-js';

@Component({
  selector: 'app-source-input',
  templateUrl: './source-input.component.html',
  styleUrls: ['./source-input.component.scss'],
})
export class SourceInputComponent implements OnInit {
  @Output() changed: EventEmitter<string> = new EventEmitter<string>();
  srcInput: string | null = null;
  inputHandler: InputHandler;

  constructor() {
    this.inputHandler = new InputHandler();
    this.srcInput = `
    P|Victoria|Bernadotte
    T|070-0101010|0459-123456
    A|Haga Slott|Stockholm|101
    F|Estelle|2012
    A|Solliden|Öland|10002
    F|Oscar|2016
    T|0702-020202|02-202020
    P|Joe|Biden
    A|White House|Washington, D.C
    `;
  }
  ngOnInit(): void {
    const event = {
      target: {
        value: `
    P|Victoria|Bernadotte
    T|070-0101010|0459-123456
    A|Haga Slott|Stockholm|101
    F|Estelle|2012
    A|Solliden|Öland|10002
    F|Oscar|2016
    T|0702-020202|02-202020
    P|Joe|Biden
    A|White House|Washington, D.C
    `,
      },
    };
    this.srcChanged(event);
  }
  srcChanged(event: any) {
    let xml = this.inputHandler.convertStringToXml(event.target.value);

    this.changed.emit(xml);
  }
}
