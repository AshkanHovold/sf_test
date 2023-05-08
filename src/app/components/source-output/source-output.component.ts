import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-source-output',
  templateUrl: './source-output.component.html',
  styleUrls: ['./source-output.component.scss'],
})
export class SourceOutputComponent {
  @Input() xml$: Observable<string> | null = null;
  srcOutput: string = '';
}
