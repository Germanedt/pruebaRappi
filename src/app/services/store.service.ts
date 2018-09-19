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

  shoppingCart: Array<{
    quantity: number,
    price: any,
    name: string,
    id: string
  }>;

  constructor(public serviceHttp: Http) {
    console.log('Inicio provider');
    this.routesService = './files/';
    this.productslist = [];
    if (localStorage.getItem('shoppingCart') != null) {
      this.shoppingCart = JSON.parse( localStorage.getItem('shoppingCart') );
    } else {
      this.shoppingCart = [];
    }
    console.log(this.shoppingCart);
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
  /**
   * Función encargada de cargar los productos que se despliegan en la vista;
   * @param listProducts lista de productos que se desea mostrar
   */
  loadProductList(listProducts) {
    this.productslist = listProducts;
    this.productslist = this.productslist.sort(function(obj1, obj2) {
      return obj1.name.localeCompare(obj2.name);
    });
  }
  /**
   * Función encargada de ordenar los productos que se muestran en la vista segun el parametro
   * @param order orden en el que se quiere ordenar la lista de productos.
   */
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
  /**
   * Función encargada de listar los productos que corresponden a una categoría
   * @param category id de la categoría seleccionada
   * @param name nombre de la sección de productos
   */
  listProductsByCategory(category, name) {
    this.titleList = name;
    this.loadProductList(this.products.filter( product => product.sublevel_id === category));
  }

  /**
   * Función encargada de filtar los productos por disponibilidad
   * @param value true o false que corresponden a disponibilidad
   */
  filterByAvailability(value: boolean) {
    let disponibilidad = 'disponibles';
    if (!value) {
      disponibilidad = 'no disponibles';
    }
    this.titleList = 'Productos ' + disponibilidad;

    this.loadProductList(this.products.filter( product => product.available === value));
  }
  /**
   * Función encargada de agregar un producto al carrito de compra
   * @param product_id id del producto que se desea agregar
   */
  addProductToShoppingCart(product_id: string) {
    const productFound = this.products.find(product => product.id === product_id);

    if (productFound) {
      this.shoppingCart.push({quantity: 1, price: productFound.price, name: productFound.name, id: productFound.id});
    }

    localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
    console.log(this.shoppingCart);
  }
  /**
   * Funció encargada de eliminar un producto del carrito de compra
   * @param product_id id del producto que se desea eliminar.
   */
  removeProductToShoppingCart(product_id: string) {
    const productFound = this.shoppingCart.find(cart => cart.id === product_id);

    if (productFound) {
      const index = this.shoppingCart.indexOf(productFound);

      this.shoppingCart.splice(index, 1);
    }
    localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
    console.log(this.shoppingCart);
  }
}
