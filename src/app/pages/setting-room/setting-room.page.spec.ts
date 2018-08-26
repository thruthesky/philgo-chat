import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingRoomPage } from './setting-room.page';

describe('SettingRoomPage', () => {
  let component: SettingRoomPage;
  let fixture: ComponentFixture<SettingRoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingRoomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
