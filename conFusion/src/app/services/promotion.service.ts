import {Injectable} from '@angular/core';
import {Promotion} from '../shared/promotion';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ProcessHTTPMsgService} from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  getPromotions(): Observable<Promotion[]> {
    return this.httpClient.get<Promotion[]>('http://localhost:3000/promotions').pipe(catchError(this.processHttpService.handleError));
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.httpClient.get<Promotion>('http://localhost:3000/promotions/' + id).pipe(catchError(this.processHttpService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.httpClient.get<Promotion>('http://localhost:3000/promotions')
      .pipe(map(leaders => leaders[0])).pipe(catchError(this.processHttpService.handleError));
  }

  constructor(private httpClient: HttpClient, private processHttpService: ProcessHTTPMsgService) {
  }
}
