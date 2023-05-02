import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceInputComponent } from './source-input.component';
import { FormsModule } from '@angular/forms';

describe('SourceInputComponent', () => {
  let component: SourceInputComponent;
  let fixture: ComponentFixture<SourceInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SourceInputComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SourceInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
