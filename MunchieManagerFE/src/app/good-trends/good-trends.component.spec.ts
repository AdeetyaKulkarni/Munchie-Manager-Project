import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodTrendsComponent } from './good-trends.component';

describe('GoodTrendsComponent', () => {
  let component: GoodTrendsComponent;
  let fixture: ComponentFixture<GoodTrendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodTrendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
