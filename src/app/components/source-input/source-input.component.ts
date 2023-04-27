import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InputHandler } from 'src/app/handlers/input-handler';
import { js2xml } from 'xml-js';

@Component({
  selector: 'app-source-input',
  templateUrl: './source-input.component.html',
  styleUrls: ['./source-input.component.scss'],
})
export class SourceInputComponent implements OnInit {
  srcInput: string = `
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
  inputHandler: InputHandler;
  @Output() changed: EventEmitter<string> = new EventEmitter<string>();

  srcChanged(event: any) {
    let result = this.inputHandler.processString(event.target.value);
    let obj = { people: result };
    let json = JSON.stringify(obj);
    const options = {
      compact: true,
      ignoreComment: true,
      spaces: 4,
    };
    const xml = js2xml(JSON.parse(json), options);
    this.changed.emit(xml);
  }
  constructor() {
    this.inputHandler = new InputHandler();
  }
  ngOnInit(): void {}
}
