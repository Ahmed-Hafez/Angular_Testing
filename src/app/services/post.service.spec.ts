import { PostService } from './post.service';
describe('PostService', () => {
  let service: PostService;
  let mockHttpClient: any;

  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'delete']);
    service = new PostService(mockHttpClient);
  });

  it('should call http get method one time only when trying to get posts', () => {
    service.getPosts();
    expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
  });

  it('should call http delete method one time only when trying to delete post', () => {
    service.deletePost({ id: 1, title: 'title', body: 'body' });
    expect(mockHttpClient.delete).toHaveBeenCalledTimes(1);
  });
});
