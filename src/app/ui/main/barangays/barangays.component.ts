import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-barangays',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './barangays.component.html',
  styleUrl: './barangays.component.scss',
})
export class BarangaysComponent {}
