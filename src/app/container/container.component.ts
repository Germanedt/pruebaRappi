import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';
import { log } from 'util';
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

  orderProducts(order: string) {
    this.serviceStore.orderProducts(order);
  }
}
