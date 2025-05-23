import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyFlightComponent } from './modify-flight.component';

describe('ModifyFlightComponent', () => {
  let component: ModifyFlightComponent;
  let fixture: ComponentFixture<ModifyFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyFlightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
