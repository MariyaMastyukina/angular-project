import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProcessHTTPMsgService} from './process-httpmsg.service';
import {Feedback} from '../shared/feedback';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  submitFeedBack(feedback: Feedback): Observable<Feedback> {
    return this.httpClient.post<Feedback>('http://localhost:3000/feedback', feedback)
      .pipe(catchError(this.processHttpService.handleError));
  }
  constructor(private httpClient: HttpClient, private processHttpService: ProcessHTTPMsgService) { }
}
