import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRoomsPage } from './my-rooms.page';

describe('MyRoomsPage', () => {
  let component: MyRoomsPage;
  let fixture: ComponentFixture<MyRoomsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRoomsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRoomsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
