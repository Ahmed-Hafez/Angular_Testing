import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PostService } from './post.service';
import { Post } from '../models/post.model';

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

describe('PostService without http client testing', () => {
  let postService: PostService;
  let mockHttpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostService,
        {
          provide: HttpClient,
          useValue: jasmine.createSpyObj('HttpClient', ['get', 'delete']),
        },
      ],
    });

    mockHttpClient = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    postService = TestBed.inject(PostService);
  });

  describe('getPosts', () => {
    it('should call http get method one time only when trying to get posts', () => {
      postService.getPosts();
      expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('deletePost', () => {
    it('should call http delete method one time only when trying to delete post', () => {
      postService.deletePost({ id: 1, title: 'title', body: 'body' });
      expect(mockHttpClient.delete).toHaveBeenCalledTimes(1);
    });
  });
});

describe('PostService with http client testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let postService: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    postService = TestBed.inject(PostService);
  });

  it('should get all posts when calling getPosts method', () => {
    postService.getPosts().subscribe((posts) => {
      expect(posts).toBe(POSTS);
    });
    const request = httpTestingController.expectOne(
      postService.apiUrl + '/posts'
    );
    request.flush(POSTS);
    expect(request.request.method).toBe('GET');
  });

  it('should get specific post when calling getPost method with postId', () => {
    const postId = 1;
    const testPost = POSTS.find((post) => post.id === postId) as Post;
    postService.getPost(postId).subscribe((post) => {
      expect(post).toBe(testPost);
    });
    const request = httpTestingController.expectOne(
      postService.apiUrl + '/posts/' + postId
    );
    request.flush(testPost);
    expect(request.request.method).toBe('GET');
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
