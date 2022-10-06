import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LightModeSwitcherComponent } from './light-mode-switcher.component';

describe('LightModeSwitcherComponent', () => {
  let component: LightModeSwitcherComponent;
  let fixture: ComponentFixture<LightModeSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LightModeSwitcherComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LightModeSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
