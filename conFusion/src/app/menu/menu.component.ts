import {Component, OnInit} from '@angular/core';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import {expand, flyInOut} from '../animations/app.animation';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(), expand()
  ]
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  errorMsg: string;
  constructor(private dishService: DishService) { }

  ngOnInit(): void {
    this.dishService.getDishes().subscribe((dishes) => this.dishes = dishes, error => this.errorMsg = error);
  }
}
