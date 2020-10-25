import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantTrendsComponent } from './restaurant-trends.component';

describe('RestaurantTrendsComponent', () => {
  let component: RestaurantTrendsComponent;
  let fixture: ComponentFixture<RestaurantTrendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantTrendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
