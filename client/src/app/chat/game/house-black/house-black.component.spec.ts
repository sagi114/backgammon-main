import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseBlackComponent } from './house-black.component';


describe('HouseBlackComponent', () => {
  let component: HouseBlackComponent;
  let fixture: ComponentFixture<HouseBlackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseBlackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseBlackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
