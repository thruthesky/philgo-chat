import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingDevInfoPage } from './setting-dev-info.page';

describe('SettingDevInfoPage', () => {
  let component: SettingDevInfoPage;
  let fixture: ComponentFixture<SettingDevInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingDevInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingDevInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
