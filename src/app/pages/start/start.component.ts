import { Component } from '@angular/core';
import { of, Observable } from 'rxjs';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent {
  xml$: Observable<string> | null = null;

  nrOfPersons: number = 10;

  sourceChanged(xml: string) {
    this.xml$ = of(xml);
  }
}
