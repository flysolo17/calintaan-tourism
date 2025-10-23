import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBarangaysComponent } from './create-barangays.component';

describe('CreateBarangaysComponent', () => {
  let component: CreateBarangaysComponent;
  let fixture: ComponentFixture<CreateBarangaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBarangaysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateBarangaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
