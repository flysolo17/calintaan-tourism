import { QueryDocumentSnapshot } from '@angular/fire/firestore';

export interface Post {
  id: string;
  type: PostType;
  title: string;
  description: string;
  image: string;
  link?: string;
  eventInformation?: EventInformation;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventInformation {
  location: string;
  date: string;
  time: string;
}
export enum PostType {
  NEWS = 'news',
  EVENT = 'event',
}

export const PostConverter = {
  toFirestore: (data: Post) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const data = snap.data() as Post;
    data.createdAt = (data.createdAt as any).toDate();
    data.updatedAt = (data.updatedAt as any).toDate();
    return data;
  },
};

export const POSTS_SAMPLES: Post[] = [
  {
    id: '1',
    type: PostType.NEWS,
    title: 'Jetpack Compose 1.6 Released',
    description:
      'Google announces new animation APIs and performance improvements in Jetpack Compose 1.6.',
    image: 'assets/images/concert_1.jpg',
    link: 'https://developer.android.com/jetpack/androidx/releases/compose',
    createdAt: new Date('2025-10-10T09:00:00'),
    updatedAt: new Date('2025-10-10T09:00:00'),
  },
  {
    id: '2',
    type: PostType.EVENT,
    title: 'Compose Camp: Manila Edition',
    description:
      'Join developers in Manila for a hands-on workshop on Jetpack Compose and modular architecture.',
    image: 'assets/images/concert_1.jpg',
    eventInformation: {
      location: 'Google Dev Hub, Manila',
      date: '2025-11-05',
      time: '10:00 AM',
    },
    link: 'https://gdgmanila.com/compose-camp',
    createdAt: new Date('2025-10-15T14:00:00'),
    updatedAt: new Date('2025-10-15T14:00:00'),
  },
  {
    id: '3',
    type: PostType.NEWS,
    title: 'Localization Trends in 2025',
    description:
      'Explore how global apps are evolving with real-time language switching and dynamic resource management.',
    image: 'assets/images/concert_1.jpg',
    link: 'https://medium.com/localization-trends-2025',
    createdAt: new Date('2025-10-18T08:30:00'),
    updatedAt: new Date('2025-10-18T08:30:00'),
  },
  {
    id: '4',
    type: PostType.EVENT,
    title: 'Transcription Tech Meetup',
    description:
      'A deep dive into real-time audio transcription pipelines with Kotlin coroutines and Compose.',
    image: 'assets/images/concert_1.jpg',
    eventInformation: {
      location: 'TechSpace BGC',
      date: '2025-11-12',
      time: '6:00 PM',
    },
    createdAt: new Date('2025-10-20T10:00:00'),
    updatedAt: new Date('2025-10-20T10:00:00'),
  },
];
