import { Component } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent {
  xml: string | null = null;

  sourceChanged(xml: string) {
    debugger;
    this.xml = xml;
  }
}
