import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  constructor(public serviceStore: StoreService) {}

  ngOnInit() {
    this.serviceStore.listCategories().then( (data) => {
      this.serviceStore.categories = data.json()['categories'];
    });
  }

  listByCategory(category: number, name: string) {
    this.serviceStore.listProductsByCategory(category, name);
  }

  filterByAvailability(){
  }
}
