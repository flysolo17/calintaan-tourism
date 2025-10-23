import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Post } from '../../../../models/Post';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss',
})
export class NewsCardComponent {
  @Input({ required: true }) news!: Post;
}
