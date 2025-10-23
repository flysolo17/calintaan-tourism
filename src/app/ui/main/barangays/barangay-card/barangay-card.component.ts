import { Component, Input } from '@angular/core';
import { Barangay } from '../../../../models/Barangay';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barangay-card',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './barangay-card.component.html',
  styleUrl: './barangay-card.component.scss',
})
export class BarangayCardComponent {
  @Input({
    required: true,
  })
  barangay!: Barangay;
}
