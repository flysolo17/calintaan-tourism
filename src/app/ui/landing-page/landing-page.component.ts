import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { LoginDialogComponent } from '../auth/login-dialog/login-dialog.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../common/topbar/topbar.component';
import { ProductListComponent } from '../main/products/product-list/product-list.component';
import { BarangayService } from '../../services/barangay.service';
import { BarangayCardComponent } from '../main/barangays/barangay-card/barangay-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { PRODUCTS } from '../../models/Product';
import { ProductCardComponent } from '../main/products/product-card/product-card.component';
import { CarouselComponent } from '../common/carousel/carousel.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    TopbarComponent,
    MatDialogModule,
    CommonModule,
    ProductListComponent,
    MatButtonModule,
    MatIconModule,
    ProductCardComponent,
    BarangayCardComponent,
    CarouselComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  tabs = ['Popular Barangays', 'Popular Destinations', 'Where to eat ?'];

  selectedTab = -1;

  onHover(index: number) {
    this.selectedTab = index;
    //if not hovered -1
  }
  onLeave() {
    this.selectedTab = -1;
  }

  onLogin() {
    this.openLoginOrSignup();
  }
  onSignUp() {}
  onSearchTextChange(value: String) {
    console.log('Search text changed:', value);
  }
  user$ = this.authService.getCurrentUser();
  products$ = of(PRODUCTS);
  barangays$ = this.barangayService.getAll();
  constructor(
    public dialog: MatDialog,
    private authService: AuthService,

    private barangayService: BarangayService
  ) {}
  ngOnInit(): void {}

  openLoginOrSignup() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '450px',
      panelClass: 'rounded-dialog',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  @ViewChild('scrollContainer', { static: false })
  scrollContainer!: ElementRef<HTMLDivElement>;

  scrollLeft(): void {
    this.scrollContainer.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  }

  scrollRight(): void {
    this.scrollContainer.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  }
}
