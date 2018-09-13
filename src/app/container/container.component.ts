import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  titleList: string;
  productslist: Array<{
    quantity: number,
    price: string,
    available: boolean,
    sublevel_id: number,
    name: string,
    id: string
  }>;
  constructor(public serviceStore: StoreService) {
    this.productslist = [];
    this.titleList = 'Todos los productos';
  }
  ngOnInit() {
    this.serviceStore.listAllProducts().then((data) => {
      this.serviceStore.products = data.json()['products'];
      this.productslist = this.serviceStore.products;
      console.log(this.serviceStore.products);
    });
  }
  listaProductosCategoria(category) {
    return this.serviceStore.products.filter( product => product.sublevel_id === category);
  }
}
