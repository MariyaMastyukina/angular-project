import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {ProcessHTTPMsgService} from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {
  getLeaders(): Observable<Leader[]> {
    return this.httpClient.get<Leader[]>('http://localhost:3000/leadership').pipe(catchError(this.processHttpService.handleError));
  }
  getLeader(id: string): Observable<Leader> {
    return this.httpClient.get<Leader>('http://localhost:3000/leadership/' + id).pipe(catchError(this.processHttpService.handleError));
  }
  getFeaturedLeader(): Observable<Leader> {
    return this.httpClient.get<Leader>('http://localhost:3000/leadership?featured=true')
      .pipe(map(leaders => leaders[0])).pipe(catchError(this.processHttpService.handleError));
  }
  constructor(private httpClient: HttpClient, private processHttpService: ProcessHTTPMsgService) { }
}
