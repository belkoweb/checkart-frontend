import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtapisComponent } from './addtapis.component';

describe('AddtapisComponent', () => {
  let component: AddtapisComponent;
  let fixture: ComponentFixture<AddtapisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtapisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtapisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
