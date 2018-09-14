import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';
import { log } from 'util';
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  titleList: string;
  order:string = 'Todos';
  ordertype:boolean = true;
  productslist: Array<{
    quantity: number,
    price: any,
    priceText: string,
    available: boolean,
    sublevel_id: number,
    name: string,
    id: string
  }>;
  constructor(public serviceStore: StoreService) {
    this.productslist = [];
    this.titleList = 'Listado de productos';
  }

  ngOnInit() {
    this.loadAllProducts();
  }

  loadAllProducts(){
    this.serviceStore.listAllProducts().then((data) => {
      this.serviceStore.products = data.json()['products'];
      this.serviceStore.products.forEach(product => {
          product['priceText']= product.price;
          product.price = parseInt(product.price.replace('$','').replace(',', ''));
      });
      this.productslist = this.serviceStore.products;
      this.productslist = this.productslist.sort(function(obj1, obj2) {
        return obj1.name.localeCompare(obj2.name);
      });
    });
  }

  orderProducts(order: string){
    if (this.order === order) {
      this.ordertype = !this.ordertype;
    }else{
      this.order = order;
      this.ordertype = true;
    }
    if (order == 'Todos') {
      if (this.ordertype) {
        this.productslist = this.productslist.sort(function(obj1, obj2) {
          return obj1.name.localeCompare(obj2.name);
        });
      }else{
        this.productslist = this.productslist.sort(function(obj1, obj2) {
          return obj2.name.localeCompare(obj1.name);
        });
      }
    }else if (order === 'Disponibilidad') {

      if (this.ordertype) {
        this.productslist = this.productslist.sort(function(obj1, obj2) {
          return (obj1.available === obj2.available)? 0 : obj1.available? -1 : 1;
        });
      }else{
        this.productslist = this.productslist.sort(function(obj1, obj2) {
          return (obj2.available === obj1.available)? 0 : obj2.available? -1 : 1;
        });
      }

    } else if (order === 'Precio') {

      if (this.ordertype) {
        this.productslist = this.productslist.sort(function(obj1, obj2) {                   
          return obj1.price - obj2.price;
        });
      }else{
        this.productslist = this.productslist.sort(function(obj1, obj2) {
          return obj2.price - obj1.price;
        });
      }
      
    } else if (order === 'Cantidad'){

      if (this.ordertype) {
        this.productslist = this.productslist.sort(function(obj1, obj2) {
          return obj1.quantity - obj2.quantity;
        });
      }else{
        this.productslist = this.productslist.sort(function(obj1, obj2) {
          return obj2.quantity - obj1.quantity;
        });
      }
      
    }
  }

  listaProductosCategoria(category) {
    return this.serviceStore.products.filter( product => product.sublevel_id === category);
  }
}
