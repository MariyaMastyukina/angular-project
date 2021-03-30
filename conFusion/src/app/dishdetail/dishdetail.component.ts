import {Component, OnInit, ViewChild} from '@angular/core';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import {Location} from '@angular/common';
import {Params, ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommentComponent} from '../comment/comment.component';
import {MatDialog} from '@angular/material/dialog';
import {Comment} from '../shared/comment';
import {CommentService} from '../services/comment.service';
import {expand, flyInOut, visibility} from '../animations/app.animation';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(), visibility(), expand()
  ]
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: string[];
  dishCopy: Dish;
  prev: string;
  next: string;
  comment: Comment;
  commentForm: FormGroup;
  errorMsg: string;
  visibility = 'shown';
  @ViewChild('fform') commentFormDirective;
  formErrors = {
    'comment': '',
    'author': '',
  };
  messageErrors = {
    'comment': {
      'required': 'Comment is required'
    },
    'author': {
      'required': 'Name is required',
      'minlength': 'Name must be at least 2 characters long.'
    }
  };
  // tslint:disable-next-line:max-line-length
  constructor( private commentService: CommentService, private dialog: MatDialog, private dishService: DishService, private route: ActivatedRoute, private location: Location, public fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    this.dishService.getDishIds().subscribe((dishIds) => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishService.getDish(params['id']); }))
      // tslint:disable-next-line:max-line-length
      .subscribe(dish => { this.dish = dish; this.dishCopy = dish; this.setPrevNext(this.dish.id); this.visibility = 'shown';}, error => this.errorMsg = error);
  }
  createForm() {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required],
      rating: 5,
      author: ['', [Validators.required, Validators.minLength(2)]],
      date: ''
    });
    this.commentForm.valueChanges.subscribe((data) => this.onValueChange(data));
    this.onValueChange();
  }
  onValueChange(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.messageErrors[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  goBack(): void {
    this.location.back();
  }
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  OpenCommentDialog() {
    this.dialog.open(CommentComponent, { width: '500px', height: '450px'});
  }
  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toString();
    console.log(this.comment);
    this.commentService.setComment(this.comment);
    this.OpenCommentDialog();
    this.dishCopy.comments.push(this.comment);
    this.dishService.saveDish(this.dishCopy).subscribe(dish => {
      this.dishCopy = dish;
      this.dish = dish;
    }, error => {
      this.errorMsg = error;
      this.dish = null;
      this.dishCopy = null;
    });
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      comment: '',
      rating: 5,
      author: '',
      date: ''
    });
  }
}
