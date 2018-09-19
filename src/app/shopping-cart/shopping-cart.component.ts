import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(public serviceStore: StoreService) { }

  ngOnInit() {}
  updateToShoppingCart(product_id: string, event: any) {
    let quantity: number;

    if (event.target.value === '0') {
      quantity = 1;
    } else {
      quantity = event.target.value;
    }
    this.serviceStore.updateProductToShoppingCart(product_id, quantity);
  }
  removeToShoppingCart(product_id: string) {
    this.serviceStore.removeProductToShoppingCart( product_id );
  }
  purchaseProducts() {
    localStorage.clear();
    this.serviceStore.loadShoppingCart();
  }
}
