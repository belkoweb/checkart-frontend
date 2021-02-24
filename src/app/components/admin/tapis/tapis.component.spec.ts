import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TapisComponent } from './tapis.component';

describe('TapisComponent', () => {
  let component: TapisComponent;
  let fixture: ComponentFixture<TapisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TapisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TapisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
