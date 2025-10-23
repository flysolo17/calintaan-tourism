import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangaysComponent } from './barangays.component';

describe('BarangaysComponent', () => {
  let component: BarangaysComponent;
  let fixture: ComponentFixture<BarangaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarangaysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarangaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
