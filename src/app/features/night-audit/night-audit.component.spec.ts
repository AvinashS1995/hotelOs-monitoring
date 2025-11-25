import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NightAuditComponent } from './night-audit.component';

describe('NightAuditComponent', () => {
  let component: NightAuditComponent;
  let fixture: ComponentFixture<NightAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NightAuditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NightAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
