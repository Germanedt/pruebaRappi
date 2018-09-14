import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( public serviceStore: StoreService) {}

  ngOnInit() {
  }

  listAllProducts() {
    this.serviceStore.listAllProducts();
  }

}
