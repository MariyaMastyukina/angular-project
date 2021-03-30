import { Injectable } from '@angular/core';
import {Comment} from '../shared/comment';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  currentComment: Comment;
  setComment(comment: Comment) {
    this.currentComment = comment;
  }
  getComment(): Observable<Comment> {
    return of(this.currentComment);
}
  constructor() { }
}
