import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import {Observable, of} from 'rxjs';
import {catchError, delay, map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProcessHTTPMsgService} from './process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class DishService {
  getDishes(): Observable<Dish[]> {
    return this.httpClient.get<Dish[]>('http://localhost:3000/dishes').pipe(catchError(this.processHttpService.handleError));
  }
  getDish(id: string): Observable<Dish> {
    return this.httpClient.get<Dish>('http://localhost:3000/dishes/' + id).pipe(catchError(this.processHttpService.handleError));
  }
  getFeaturedDish(): Observable<Dish> {
    return this.httpClient.get<Dish>('http://localhost:3000/dishes?featured=true')
      .pipe(map(dishes => dishes[0])).pipe(catchError(this.processHttpService.handleError));
  }
  getDishIds(): Observable<string[]> {
    return this.httpClient.get<Dish[]>('http://localhost:3000/dishes')
      .pipe(map(dishes => dishes.map(dish => dish.id))).pipe(catchError(this.processHttpService.handleError));
  }
  saveDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.put<Dish>('http://localhost:3000/dishes/' + dish.id, dish, httpOptions)
      .pipe(catchError(this.processHttpService.handleError));
  }
  constructor(private httpClient: HttpClient, private processHttpService: ProcessHTTPMsgService) { }
}
