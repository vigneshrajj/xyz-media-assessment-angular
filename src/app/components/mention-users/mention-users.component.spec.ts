import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionUsersComponent } from './mention-users.component';

describe('MentionUsersComponent', () => {
  let component: MentionUsersComponent;
  let fixture: ComponentFixture<MentionUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentionUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentionUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
