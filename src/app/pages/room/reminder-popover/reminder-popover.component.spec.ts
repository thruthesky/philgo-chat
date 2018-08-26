import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderPopoverComponent } from './reminder-popover.component';

describe('ReminderPopoverComponent', () => {
  let component: ReminderPopoverComponent;
  let fixture: ComponentFixture<ReminderPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
