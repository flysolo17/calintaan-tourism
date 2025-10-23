import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangayCardComponent } from './barangay-card.component';

describe('BarangayCardComponent', () => {
  let component: BarangayCardComponent;
  let fixture: ComponentFixture<BarangayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarangayCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarangayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
