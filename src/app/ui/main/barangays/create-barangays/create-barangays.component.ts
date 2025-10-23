import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BarangayService } from '../../../../services/barangay.service';
import { MatCardModule } from '@angular/material/card';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { Barangay } from '../../../../models/Barangay';

import { convertToWebp } from '../../../../utils/ImageCompressor';
import { ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-create-barangays',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatChipsModule,
    MatCardModule,
  ],
  templateUrl: './create-barangays.component.html',
  styleUrl: './create-barangays.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBarangaysComponent {
  loading: boolean = false;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly announcer = inject(LiveAnnouncer);
  images: File[] = [];

  barangayForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private location: Location,
    private barangayService: BarangayService
  ) {
    this.barangayForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      population: [null, [Validators.required, Validators.min(1)]],
      areaSize: [null, [Validators.min(0)]],
      latitude: [null, [Validators.min(-90), Validators.max(90)]],
      longitude: [null, [Validators.min(-180), Validators.max(180)]],
      culture: [''],
      history: [''],
      economy: [''],
      mainProducts: this.fb.array([]),
      schools: this.fb.array([]),
      healthCenters: this.fb.array([]),
      transportation: this.fb.array([]),
      emergencyContacts: this.fb.group({
        police: [''],
        fire: [''],
        hospital: [''],
        barangayHall: [''],
      }),
    });
  }

  get mainProducts(): FormArray {
    return this.barangayForm.get('mainProducts') as FormArray;
  }

  get schools(): FormArray {
    return this.barangayForm.get('schools') as FormArray;
  }

  get healthCenters(): FormArray {
    return this.barangayForm.get('healthCenters') as FormArray;
  }

  get transportation(): FormArray {
    return this.barangayForm.get('transportation') as FormArray;
  }

  addChip(event: MatChipInputEvent, arrayName: string): void {
    const value = (event.value || '').trim();
    if (value) {
      (this.barangayForm.get(arrayName) as FormArray).push(
        this.fb.control(value)
      );
    }
    event.chipInput!.clear();
  }

  removeChip(index: number, arrayName: string): void {
    (this.barangayForm.get(arrayName) as FormArray).removeAt(index);
  }
  async onFileSelected(event: any) {
    const files: File[] = Array.from(event.target.files);
    const compressedFiles: File[] = [];

    for (const file of files) {
      const compressed = await convertToWebp(file);
      compressedFiles.push(compressed);
    }

    this.images = compressedFiles;
    console.log(this.images);
  }
  async onSubmit() {
    if (this.barangayForm.invalid) {
      this.barangayForm.markAllAsTouched();
      return;
    }
    console.log(this.barangayForm.value);

    const barangay: Barangay = {
      ...this.barangayForm.value,
      id: '',
      images: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.barangayService.create(barangay, this.images);
    this.location.back();
  }

  onBack() {
    this.location.back();
  }
}
