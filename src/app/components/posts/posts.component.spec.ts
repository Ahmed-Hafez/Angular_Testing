import { By } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

import { PostsComponent } from './posts.component';
import { PostComponent } from '../post/post.component';

const POSTS = [
  {
    id: 1,
    body: 'body 1',
    title: 'title 1',
  },
  {
    id: 2,
    body: 'body 2',
    title: 'title 2',
  },
  {
    id: 3,
    body: 'body 3',
    title: 'title 3',
  },
];

class mockPostService {
  getPosts() {
    return of(POSTS);
  }

  deletePost(post: Post) {
    return of(true);
  }
}

describe('Posts Component', () => {
  let fixture: ComponentFixture<PostsComponent>;
  let component: PostsComponent;
  let postService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostsComponent, PostComponent],
      providers: [
        {
          provide: PostService,
          useClass: mockPostService,
        },
      ],
    });

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService);
  });

  describe('get', () => {
    it('should initialize posts array directly with posts', () => {
      fixture.detectChanges();
      expect(component.posts.length).toBeGreaterThan(0);
    });

    it('should get posts when getPosts method is called', () => {
      expect(component.posts.length).toEqual(0);
      component.getPosts();
      expect(component.posts.length).toBeGreaterThan(0);
    });

    it('should render app-post for each post (Detection using css selector)', () => {
      fixture.detectChanges();
      const debugElement = fixture.debugElement;
      let noOfCreatedElements = debugElement.queryAll(
        By.css('app-post')
      ).length;
      expect(noOfCreatedElements).toEqual(POSTS.length);
    });

    it('should render app-post for each post (Detection using directive)', () => {
      fixture.detectChanges();
      const debugElement = fixture.debugElement;
      let noOfCreatedElements = debugElement.queryAll(
        By.directive(PostComponent)
      ).length;
      expect(noOfCreatedElements).toEqual(POSTS.length);
    });

    it('should pass the correct post to each post component', () => {
      fixture.detectChanges();
      const debugElement = fixture.debugElement;
      let createdElements = debugElement.queryAll(By.directive(PostComponent));
      for (let i in createdElements) {
        expect(
          (createdElements[i].componentInstance as PostComponent).post
        ).toBe(POSTS[i]);
      }
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      component.posts = POSTS;
    });
    it('should delete the selected Post from the posts', () => {
      component.deletePost(POSTS[1]);

      expect(component.posts.length).toBe(2);
      for (let post of component.posts) {
        expect(post).not.toEqual(POSTS[1]);
      }
    });

    it('should call the delete method in Post Service only once', () => {
      spyOn(postService, 'deletePost').and.callThrough();
      component.deletePost(POSTS[1]);
      expect(postService.deletePost).toHaveBeenCalledTimes(1);
    });
  });
});
