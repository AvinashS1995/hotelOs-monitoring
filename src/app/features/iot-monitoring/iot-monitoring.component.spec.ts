import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IotMonitoringComponent } from './iot-monitoring.component';

describe('IotMonitoringComponent', () => {
  let component: IotMonitoringComponent;
  let fixture: ComponentFixture<IotMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IotMonitoringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IotMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
