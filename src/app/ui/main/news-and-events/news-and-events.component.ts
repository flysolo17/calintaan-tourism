import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PostService } from '../../../services/post.service';
import { CreatePostDialogComponent } from './create-post-dialog/create-post-dialog.component';
import { Post, POSTS_SAMPLES, PostType } from '../../../models/Post';
import { CommonModule } from '@angular/common';
import { NewsCardComponent } from './news-card/news-card.component';
import { map, Observable, of } from 'rxjs';
import { EventCardComponent } from './event-card/event-card.component';

@Component({
  selector: 'app-news-and-events',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTabsModule,
    MatDialogModule,
    CommonModule,
    EventCardComponent,
    NewsCardComponent,
  ],
  templateUrl: './news-and-events.component.html',
  styleUrl: './news-and-events.component.scss',
})
export class NewsAndEventsComponent {
  loading = false;

  post$ = of(POSTS_SAMPLES);

  news$: Observable<Post[]> = this.post$.pipe(
    map((e) => e.filter((post) => post.type === PostType.NEWS))
  );
  events$: Observable<Post[]> = this.post$.pipe(
    map((e) => e.filter((post) => post.type === PostType.EVENT))
  );
  constructor(private postService: PostService, private dialog: MatDialog) {}

  createPost(): void {
    const dialogRef = this.dialog.open(CreatePostDialogComponent, {
      width: '700px',
      disableClose: true,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      const { post, image } = result;

      if (!post || !image) {
        console.warn('Post or image missing from dialog result');
        return;
      }

      this.savePost(post, image);
    });
  }

  savePost(post: Post, image: File) {
    this.loading = true;
    this.postService
      .create(post, image)
      .then(() => {
        console.log('Succesffuly Created');
      })
      .catch((err) => {
        console.log(err['message'] ?? 'Unknown error');
      })
      .finally(() => {
        this.loading = false;
      });
  }

  get events() {
    return this.post$.pipe(
      map((e) => e.filter((post) => post.type === PostType.EVENT))
    );
  }

  get news() {
    return this.post$.pipe(
      map((e) => e.filter((post) => post.type === PostType.NEWS))
    );
  }
}
