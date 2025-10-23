import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { BarangayService } from '../../../../services/barangay.service';
import { Subscription } from 'rxjs';
import { Barangay } from '../../../../models/Barangay';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { BarangayCardComponent } from '../barangay-card/barangay-card.component';
@Component({
  selector: 'app-barangays-list',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatProgressBarModule,
    CommonModule,
    BarangayCardComponent,
  ],
  templateUrl: './barangays-list.component.html',
  styleUrl: './barangays-list.component.scss',
})
export class BarangaysListComponent implements OnInit, OnDestroy {
  loading = false;
  barangays: Barangay[] = [];
  private barangaySub = new Subscription();
  constructor(private barangayService: BarangayService) {}
  ngOnInit(): void {
    this.initBarangays();
  }
  initBarangays() {
    this.loading = true;
    this.barangaySub = this.barangayService.getAll().subscribe((data) => {
      this.barangays = data;
      this.loading = false;
    });
  }
  ngOnDestroy(): void {
    this.barangaySub?.unsubscribe();
  }
}
