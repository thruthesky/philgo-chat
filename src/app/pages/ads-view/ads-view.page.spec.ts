import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsViewPage } from './ads-view.page';

describe('AdsViewPage', () => {
  let component: AdsViewPage;
  let fixture: ComponentFixture<AdsViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
