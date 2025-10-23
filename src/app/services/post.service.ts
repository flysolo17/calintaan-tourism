import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  Firestore,
  orderBy,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Post, PostConverter } from '../models/Post';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly COLLECTION_POST = 'post';
  constructor(private firestore: Firestore, private storage: Storage) {}

  /**
   * Creates a post and uploads its image to Firebase Storage.
   * Automatically sets createdAt and updatedAt timestamps.
   */
  async create(post: Post, image: File): Promise<void> {
    try {
      const postRef = collection(this.firestore, this.COLLECTION_POST);
      const id = doc(postRef).id;
      post.id = id;

      // Upload image
      const imageRef = ref(this.storage, `posts/${id}/${image.name}`);
      await uploadBytes(imageRef, image);
      const downloadURL = await getDownloadURL(imageRef);
      post.image = downloadURL;

      // Add timestamps
      const now = new Date();
      post.createdAt = now;
      post.updatedAt = now;

      // Save to Firestore
      await setDoc(doc(this.firestore, this.COLLECTION_POST, id), post);
    } catch (err) {
      console.error('Error creating post:', err);
      throw err;
    }
  }

  /**
   * Gets all posts between two dates.
   * Defaults to posts created from start of current month until now.
   */
  getAll(
    from: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: Date = new Date()
  ): Observable<Post[]> {
    const postRef = collection(
      this.firestore,
      this.COLLECTION_POST
    ).withConverter(PostConverter);
    const q = query(
      postRef,
      where('createdAt', '>=', from),
      where('createdAt', '<=', to),
      orderBy('createdAt', 'desc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<Post[]>;
  }
}
