import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatFormTextareaComponent } from './mat-form-textarea.component';

describe('MatFormTextareaComponent', () => {
  let component: MatFormTextareaComponent;
  let fixture: ComponentFixture<MatFormTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatFormTextareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatFormTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
