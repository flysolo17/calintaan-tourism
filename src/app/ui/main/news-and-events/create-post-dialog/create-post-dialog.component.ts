import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Post, PostType } from '../../../../models/Post';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { convertToWebp } from '../../../../utils/ImageCompressor';
import { BarangayService } from '../../../../services/barangay.service';
import { Barangay } from '../../../../models/Barangay';
import { provideNativeDateAdapter } from '@angular/material/core';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { TIME_24_HOUR } from '../../../../utils/Contants';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-create-post-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatIconModule,
    FormsModule,
    MatSelectModule,
    MatIcon,
    MatCardModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-post-dialog.component.html',
  styleUrl: './create-post-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePostDialogComponent implements OnInit {
  postForm: FormGroup;
  selectedImage: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  locations: string[] = [];
  postTypes = [
    { label: 'News', value: PostType.NEWS },
    { label: 'Event', value: PostType.EVENT },
  ];
  time = TIME_24_HOUR;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreatePostDialogComponent>,
    private barangayService: BarangayService
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      type: ['', Validators.required],
      link: [''],
      location: [''],
      time: [''],
      date: [''],
    });
  }
  ngOnInit(): void {
    this.getAllBarangays();
  }
  getAllBarangays() {
    this.barangayService.getAllBarangay().then((data) => {
      this.locations = data.map((e) => e.name);
      console.log('Barangays:', this.locations);
    });
  }

  async onImageSelected(event: Event): Promise<void> {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    try {
      const compressedFile = await convertToWebp(file);
      this.selectedImage = compressedFile;

      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result);
      reader.readAsDataURL(compressedFile);
    } catch (err) {
      console.error('Error converting image to WebP:', err);
    }
  }

  submit(): void {
    if (this.postForm.invalid || !this.selectedImage) return;

    const { title, description, type, link, location, date, time } =
      this.postForm.value;
    const post: Post = {
      id: '',
      title,
      description,
      type,
      image: '',
      link,
      eventInformation: {
        location: location,
        date: date,
        time: time,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.dialogRef.close({
      post,
      image: this.selectedImage,
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
