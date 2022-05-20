import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iif } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  readonly apiUrl: string = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }

  getPost(postId: number) {
    return this.http.get<Post>(`${this.apiUrl}/posts/${postId}`);
  }

  deletePost(post: Post) {
    return this.http.delete(`${this.apiUrl}/post/${post.id}`);
  }
}
