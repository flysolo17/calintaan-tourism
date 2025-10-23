import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Post } from '../../../../models/Post';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss',
})
export class EventCardComponent {
  @Input({
    required: true,
  })
  event!: Post;

  get eventDate(): Date | null {
    const dateString = this.event.eventInformation?.date;
    return dateString ? new Date(dateString) : null;
  }
}
