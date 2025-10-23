import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBarangaysComponent } from './view-barangays.component';

describe('ViewBarangaysComponent', () => {
  let component: ViewBarangaysComponent;
  let fixture: ComponentFixture<ViewBarangaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewBarangaysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewBarangaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
