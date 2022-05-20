import { PostService } from './../../services/post.service';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  getPosts(): void {
    this.postService.getPosts().subscribe((posts) => (this.posts = posts));
  }

  deletePost(post: Post): void {
    this.posts = this.posts.filter((p) => p.id !== post.id);
    this.postService.deletePost(post);
  }
}
