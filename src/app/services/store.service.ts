import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  routesService: string;
  categories: any;
  products: any;

  titleList: string;
  order = 'Nombre';
  ordertype = true;
  productslist: Array<{
    quantity: number,
    price: any,
    priceText: string,
    available: boolean,
    sublevel_id: number,
    name: string,
    id: string
  }>;

  constructor(public serviceHttp: Http) {
    console.log('Inicio provider');
    this.routesService = './files/';
  }
  /**
   * Función encargada de listar todas las categorías
   */
  listCategories() {
    return this.serviceHttp.get(this.routesService +  'categories.json').toPromise();
  }
  /**
   * Función encargada de listar todos los productos
   */
  listAllProducts() {
    this.titleList = 'Listado de productos';
    return this.serviceHttp.get(this.routesService +  'products.json').toPromise().then( (data) => {
      this.products = data.json()['products'];
      this.products.forEach(product => {
          product['priceText'] = product.price;
          product.price = parseInt( product.price.replace( '$', '' ).replace( ',', '' ), 0);
      });
      this.loadProductList(this.products);
    });
  }

  loadProductList(listProducts) {
    this.productslist = listProducts;
    this.productslist = this.productslist.sort(function(obj1, obj2) {
      return obj1.name.localeCompare(obj2.name);
    });
  }

  orderProducts(order: string) {
    if (this.order === order) {
      this.ordertype = !this.ordertype;
    } else {
      this.order = order;
      this.ordertype = true;
    }
    if (order === 'Nombre') {
      if (this.ordertype) {
        this.productslist = this.productslist.sort(function(obj1, obj2) {
          return obj1.name.localeCompare(obj2.name);
        });
      } else {
        this.productslist = this.productslist.sort(function(obj1, obj2) {
          return obj2.name.localeCompare(obj1.name);
        });
      }
    } else if (order === 'Disponibilidad') {

      if (this.ordertype) {
        this.productslist = this.productslist.sort(function(obj1, obj2) {
          return (obj1.available === obj2.available) ? 0 : obj1.available ? -1 : 1;
        });
      } else {
        this.productslist = this.productslist.sort(function(obj1, obj2) {
          return (obj2.available === obj1.available) ? 0 : obj2.available ? -1 : 1;
        });
      }

    } else if (order === 'Precio') {

      if (this.ordertype) {
        this.productslist = this.productslist.sort(function(obj1, obj2) {
          return obj1.price - obj2.price;
        });
      } else {
        this.productslist = this.productslist.sort(function(obj1, obj2) {
          return obj2.price - obj1.price;
        });
      }

    } else if (order === 'Cantidad') {

      if (this.ordertype) {
        this.productslist = this.productslist.sort(function(obj1, obj2) {
          return obj1.quantity - obj2.quantity;
        });
      } else {
        this.productslist = this.productslist.sort(function(obj1, obj2) {
          return obj2.quantity - obj1.quantity;
        });
      }

    }
  }

  listProductsByCategory(category, name) {
    this.titleList = name;

    this.loadProductList(this.products.filter( product => product.sublevel_id === category));
  }
}
