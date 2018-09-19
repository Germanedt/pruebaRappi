import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  constructor(public serviceStore: StoreService) {}

  ngOnInit() {
    this.serviceStore.listAllProducts();
  }
  /**
   * Función encargada de llamar el servicio de ordenado de productos por tipo
   * @param order tipo de orden que se desea aplicar
   */
  orderProducts(order: string) {
    this.serviceStore.orderProducts(order);
  }

  addToShoppingCart(product_id: string) {
    this.serviceStore.addProductToShoppingCart( product_id );
  }
}
