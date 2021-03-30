import { Component, OnInit } from '@angular/core';
import {Promotion} from '../shared/promotion';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import {PromotionService} from '../services/promotion.service';
import {Leader} from '../shared/leader';
import {LeaderService} from '../services/leader.service';
import {expand, flyInOut} from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(), expand()
  ]
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishError: string;
  leaderError: string;
  promotionError: string;
  constructor(private dishService: DishService, private promotionService: PromotionService, private leaderService: LeaderService) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish().subscribe((featureddish) => this.dish = featureddish, error => this.dishError = error);
    this.promotionService.getFeaturedPromotion()
      .subscribe((featuredpromotion) => this.promotion = featuredpromotion, error => this.leaderError = error);
    this.leaderService.getFeaturedLeader()
      .subscribe((featuredleader) => this.leader = featuredleader, error => this.promotionError = error);
  }

}
