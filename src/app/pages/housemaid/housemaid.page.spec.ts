import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousemaidPage } from './housemaid.page';

describe('HousemaidPage', () => {
  let component: HousemaidPage;
  let fixture: ComponentFixture<HousemaidPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousemaidPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousemaidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
