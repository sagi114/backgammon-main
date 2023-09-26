import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatLoggedComponent } from './chat-logged.component';

describe('ChatLoggedComponent', () => {
  let component: ChatLoggedComponent;
  let fixture: ComponentFixture<ChatLoggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatLoggedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
