import { By } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

import { PostsComponent } from './posts.component';

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

  @Component({
    selector: 'app-post',
    template: '<div></div>',
  })
  class FakePostComponent {
    @Input() post!: Post;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostsComponent, FakePostComponent],
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

    it('should render app-post for each post', () => {
      fixture.detectChanges();
      const debugElement = fixture.debugElement;
      let noOfCreatedElements = debugElement.queryAll(
        By.css('app-post')
      ).length;
      expect(noOfCreatedElements).toEqual(POSTS.length);
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
