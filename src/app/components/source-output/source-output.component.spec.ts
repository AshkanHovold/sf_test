import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceOutputComponent } from './source-output.component';

describe('SourceOutputComponent', () => {
  let component: SourceOutputComponent;
  let fixture: ComponentFixture<SourceOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceOutputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourceOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
