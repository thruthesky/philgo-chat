import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRoomsPage } from './all-rooms.page';

describe('AllRoomsPage', () => {
  let component: AllRoomsPage;
  let fixture: ComponentFixture<AllRoomsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRoomsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRoomsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
