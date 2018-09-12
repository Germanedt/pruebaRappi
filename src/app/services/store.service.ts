import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  routesService: string;
  categories: any;
  products: any;

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
    return this.serviceHttp.get(this.routesService +  'products.json').toPromise();
  }
}
