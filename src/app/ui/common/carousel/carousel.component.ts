import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  trigger,
  style,
  transition,
  animate,
  query,
  group,
  animateChild,
} from '@angular/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule, MatFormFieldModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  animations: [
    trigger('slideAnimation', [
      transition(':increment', [
        // Slide Left
        query(
          ':enter, :leave',
          style({ position: 'absolute', width: '100%' }),
          {
            optional: true,
          }
        ),
        group([
          query(
            ':enter',
            [
              style({ transform: 'translateX(100%)' }),
              animate('700ms ease', style({ transform: 'translateX(0%)' })),
            ],
            { optional: true }
          ),
          query(
            ':leave',
            [
              style({ transform: 'translateX(0%)' }),
              animate('700ms ease', style({ transform: 'translateX(-100%)' })),
            ],
            { optional: true }
          ),
        ]),
      ]),
      transition(':decrement', [
        // Slide Right
        query(
          ':enter, :leave',
          style({ position: 'absolute', width: '100%' }),
          {
            optional: true,
          }
        ),
        group([
          query(
            ':enter',
            [
              style({ transform: 'translateX(-100%)' }),
              animate('700ms ease', style({ transform: 'translateX(0%)' })),
            ],
            { optional: true }
          ),
          query(
            ':leave',
            [
              style({ transform: 'translateX(0%)' }),
              animate('700ms ease', style({ transform: 'translateX(100%)' })),
            ],
            { optional: true }
          ),
        ]),
      ]),
    ]),
  ],
})
export class CarouselComponent implements OnInit, OnDestroy {
  items: string[] = [
    'assets/images/carousel_1.webp',
    'assets/images/carousel_2.webp',
    'assets/images/carousel_3.webp',
    'assets/images/carousel_4.webp',
    'assets/images/carousel_5.webp',
    'assets/images/carousel_6.webp',
  ];

  currentIndex = 0;
  previousIndex = 0;

  get animationDirection() {
    return this.currentIndex > this.previousIndex ? 1 : -1;
  }

  nextSlide() {
    this.previousIndex = this.currentIndex;
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
  }

  prevSlide() {
    this.previousIndex = this.currentIndex;
    this.currentIndex =
      (this.currentIndex - 1 + this.items.length) % this.items.length;
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
