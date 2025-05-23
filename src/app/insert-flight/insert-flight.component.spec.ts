import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertFlightComponent } from './insert-flight.component';

describe('InsertFlightComponent', () => {
  let component: InsertFlightComponent;
  let fixture: ComponentFixture<InsertFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertFlightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
