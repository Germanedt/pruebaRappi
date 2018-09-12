import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  productslist: Array<{
    id: number,
    name: string,
    products: Array<{
      quantity: number,
      price: string,
      available: boolean,
      sublevel_id: number,
      name: string,
      id: string
    }>
  }>;
  constructor(public serviceStore: StoreService) {
    this.productslist = [];
  }
  ngOnInit() {
    this.serviceStore.listAllProducts().then((data) => {
      console.log(this.serviceStore.categories);
      this.serviceStore.products = data.json()['products'];
      /*this.serviceStore.categories.forEach(category => {
        category.sublevels.forEach( level => {
          level.sublevels.forEach( subLevel => {
            console.log(subLevel);
          });
        });
        this.productslist.push({id: category.id, name: category.name, products: []});
      });*/
    });
  }

}
