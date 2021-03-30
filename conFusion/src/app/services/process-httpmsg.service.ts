import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPMsgService {

  constructor() { }
  handleError(error: HttpErrorResponse | any ) {
    let errorMsg: string;
    if (error instanceof ErrorEvent) {
      errorMsg = error.error.message;
    } else {
      errorMsg = `${error.status} - ${error.statusText || ''}. ${error.message}`;
    }
    return throwError(errorMsg);
  }
}
