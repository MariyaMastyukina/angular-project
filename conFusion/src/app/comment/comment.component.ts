import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Comment} from '../shared/comment';
import {CommentService} from '../services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  newComment: Comment;
  constructor(private commentService: CommentService, private dialogRef: MatDialogRef<CommentComponent>) { }

  ngOnInit(): void {
    this.commentService.getComment().subscribe((comment) => this.newComment = comment);
    console.log(this.newComment);
  }
  onSubmit() {
    this.dialogRef.close();
  }
}
