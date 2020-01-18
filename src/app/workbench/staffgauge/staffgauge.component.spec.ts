import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffgaugeComponent } from './staffgauge.component';

describe('StaffgaugeComponent', () => {
  let component: StaffgaugeComponent;
  let fixture: ComponentFixture<StaffgaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffgaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffgaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
