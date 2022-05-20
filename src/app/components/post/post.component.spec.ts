import { RouterModule } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { Post } from 'src/app/models/post.model';

import { PostComponent } from './post.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const POST: Post = { id: 1, body: 'body 1', title: 'title 1' };

describe('Post Component', () => {
  let fixture: ComponentFixture<PostComponent>;
  let comp: PostComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(PostComponent);
    comp = fixture.componentInstance;
  });

  it('should create post component using TestBed', () => {
    expect(comp).toBeDefined();
  });

  it('should render the post title in the anchor link', () => {
    comp.post = POST;
    fixture.detectChanges();
    let anchor = fixture.debugElement.query(By.css('a'));
    expect(anchor?.nativeElement?.textContent).toContain(POST.title);
  });

  it('should raise an event when the delete post is clicked', () => {
    comp.post = POST;
    comp.delete.pipe(first()).subscribe((selectedPost) => {
      expect(selectedPost).toEqual(POST);
    });

    comp.onDeletePost(new MouseEvent('click'));
  });
});
