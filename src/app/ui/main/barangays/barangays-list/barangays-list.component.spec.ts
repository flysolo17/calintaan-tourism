import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangaysListComponent } from './barangays-list.component';

describe('BarangaysListComponent', () => {
  let component: BarangaysListComponent;
  let fixture: ComponentFixture<BarangaysListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarangaysListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarangaysListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
