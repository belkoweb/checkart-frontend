import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrigineComponent } from './origine.component';

describe('OrigineComponent', () => {
  let component: OrigineComponent;
  let fixture: ComponentFixture<OrigineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrigineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrigineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
