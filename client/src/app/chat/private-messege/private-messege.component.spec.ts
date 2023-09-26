import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateMessegeComponent } from './private-messege.component';

describe('PrivateMessegeComponent', () => {
  let component: PrivateMessegeComponent;
  let fixture: ComponentFixture<PrivateMessegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateMessegeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateMessegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
