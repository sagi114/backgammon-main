import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoolDiceComponent } from './rool-dice.component';

describe('RoolDiceComponent', () => {
  let component: RoolDiceComponent;
  let fixture: ComponentFixture<RoolDiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoolDiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoolDiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
