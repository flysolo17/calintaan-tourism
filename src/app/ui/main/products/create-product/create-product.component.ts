import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

//new
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, inject, signal } from '@angular/core';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LiveAnnouncer } from '@angular/cdk/a11y';
@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    CommonModule,
    MatButtonModule,

    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatChipsModule,
    MatSlideToggleModule,
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProductComponent {
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  readonly tags = signal<string[]>([]);
  readonly announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.update((tags) => [...tags, value]);
    }

    event.chipInput!.clear();
  }
  remove(value: string): void {
    this.tags.update((tags) => {
      const updated = tags.filter((tag) => tag !== value);
      this.announcer.announce(`Removed ${value}`);
      return updated;
    });
  }

  steps = [
    {
      title: 'Product Information',
      description: 'Basic details about your product',
    },
    { title: 'Images', description: 'Upload and manage product images' },
    {
      title: 'Options',
      description:
        'Add or remove product options (e.g., room type, package tier)',
    },
    {
      title: 'Add-ons',
      description:
        'Extra services or features that can be purchased separately',
    },
    {
      title: 'Location',
      description: 'Address and coordinates for the product',
    },
    {
      title: 'Contact Information',
      description: 'Provide contact details for customers',
    },
    {
      title: 'Discounts',
      description: 'Define discounts and promotional periods',
    },
    {
      title: 'Additional Information',
      description: 'Provide more details about your product',
    },
    {
      title: 'Review & Submit',
      description: 'Review all product data before saving',
    },
  ];

  // Step 1: Product Information
  productInformationForm: FormGroup;

  // Step 2: Images
  imagesForm: FormGroup;

  // Step 3: Options
  optionsForm: FormGroup;

  // Step 4: Add-ons
  addOnsForm: FormGroup;

  // Step 5: Location
  locationForm: FormGroup;

  // Step 6: Contact Info
  contactForm: FormGroup;

  // Step 7: Discounts
  discountsForm: FormGroup;

  // Step 8: Additional Info
  additionalInfoForm: FormGroup;
  constructor(private location: Location, private fb: FormBuilder) {
    this.productInformationForm = fb.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      type: [null, Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      available: [true],
      tags: [[], Validators.required],
    });

    this.imagesForm = fb.nonNullable.group({
      images: [[], Validators.required],
    });

    this.optionsForm = fb.nonNullable.group({
      options: fb.array([]),
    });

    this.addOnsForm = fb.nonNullable.group({
      addOns: fb.array([]),
    });

    this.locationForm = fb.nonNullable.group({
      address: ['', Validators.required],
      latitude: [null],
      longitude: [null],
    });

    this.contactForm = fb.nonNullable.group({
      phone: ['', [Validators.pattern(/^[0-9]{10,15}$/)]],
      email: ['', [Validators.email]],
      website: [''],
    });

    this.discountsForm = fb.nonNullable.group({
      percentage: [0, [Validators.min(0), Validators.max(100)]],
      startDate: [null],
      endDate: [null],
      active: [false],
    });

    this.additionalInfoForm = fb.nonNullable.group({
      moreInformation: fb.array([]),
    });
  }

  get options(): FormArray {
    return this.optionsForm.get('options') as FormArray;
  }

  get addOns(): FormArray {
    return this.addOnsForm.get('addOns') as FormArray;
  }

  get moreInformation(): FormArray {
    return this.additionalInfoForm.get('moreInformation') as FormArray;
  }

  addOption() {
    const option = this.fb.group({
      name: ['', Validators.required],
      image: [''],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      available: [true],
    });
    this.options.push(option);
  }

  addAddOn() {
    const addOn = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      available: [true],
      createdAt: [new Date()],
      updatedAt: [new Date()],
    });
    this.addOns.push(addOn);
  }

  addMoreInfo() {
    const info = this.fb.group({
      title: ['', Validators.required],
      details: ['', Validators.required],
    });
    this.moreInformation.push(info);
  }

  onBack() {
    this.location.back();
  }

  onSubmit() {
    if (this.isFormValid()) {
      const productData = {
        ...this.productInformationForm.value,
        images: this.imagesForm.value.images,
        options: this.optionsForm.value.options,
        addOns: this.addOnsForm.value.addOns,
        location: this.locationForm.value,
        contact: this.contactForm.value,
        discounts: this.discountsForm.value,
        moreInformation: this.additionalInfoForm.value.moreInformation,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      console.log('✅ Product ready to submit:', productData);
      // TODO: send to Firestore / API
    } else {
      console.warn('⚠️ Some fields are invalid.');
    }
  }

  isFormValid(): boolean {
    return (
      this.productInformationForm.valid &&
      this.imagesForm.valid &&
      this.optionsForm.valid &&
      this.addOnsForm.valid &&
      this.locationForm.valid &&
      this.contactForm.valid &&
      this.discountsForm.valid &&
      this.additionalInfoForm.valid
    );
  }
}
