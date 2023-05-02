import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-source-output',
  templateUrl: './source-output.component.html',
  styleUrls: ['./source-output.component.scss'],
})
export class SourceOutputComponent {
  @Input() xml: string | null = '';
  srcOutput: string = '';
}
