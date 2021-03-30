import {Component, OnInit, ViewChild} from '@angular/core';
import {ContactType, Feedback} from '../shared/feedback';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {expand, flyInOut, visibility} from '../animations/app.animation';
import {ProcessHTTPMsgService} from '../services/process-httpmsg.service';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FeedbackService} from "../services/feedback.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(), expand()
  ]
})
export class ContactComponent implements OnInit {
  feedbackForm: FormGroup;
  feedbackCopy: Feedback;
  feedback: Feedback;
  contactType = ContactType;
  errorMsg: string;
  show = false;
  @ViewChild('fform') feedbackFormDirection;

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService) {
    this.createForm();
  }

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': '',
    'message': ''
  };
  messageErrors = {
    'firstname': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'First Name cannot be more than 25 characters long.'
    },
    'lastname': {
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be at least 2 characters long.',
      'maxlength': 'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required': 'Tel. number is required.',
      'pattern': 'Tel. number must contain only numbers.'
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Email not in valid format.'
    },
    'message': {
      'required': 'Your Feedback is required.'
    }
  };

  ngOnInit(): void {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contactType: '',
      message: ['', Validators.required]
    });
    this.feedbackCopy = this.feedbackForm.value;
    this.feedbackForm.valueChanges.subscribe((data) => this.onValueChanges(data));
    this.onValueChanges();
  }

  onValueChanges(data?: any) {
    if (!this.feedbackForm) {
      return;
    }
    const form = this.feedbackForm;
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

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackCopy = null;
    this.feedbackService.submitFeedBack(this.feedback).subscribe(feedback => {
      this.feedbackCopy = feedback;
      this.show = true;
      setTimeout(() => this.show = false, 5000);
    }, error => this.errorMsg = error);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contactType: '',
      message: ''
    });
    this.feedbackFormDirection.resetForm();
  }
}
