import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Game2FixProblemsComponent } from './game2-fix-problems.component';

describe('Game2FixProblemsComponent', () => {
  let component: Game2FixProblemsComponent;
  let fixture: ComponentFixture<Game2FixProblemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Game2FixProblemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Game2FixProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
