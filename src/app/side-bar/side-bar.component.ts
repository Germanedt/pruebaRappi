import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  minValue = 0;
  maxValue = 0;
  constructor(public serviceStore: StoreService) {}

  ngOnInit() {
    this.serviceStore.listCategories().then( (data) => {
      this.serviceStore.categories = data.json()['categories'];
    });
  }

  listByCategory(category: number, name: string) {
    this.serviceStore.listProductsByCategory(category, name);
  }

  filterByAvailability(event: any) {
    if (event.target.value === '-1') {
      this.serviceStore.listAllProducts();
    } else {
      this.serviceStore.filterByAvailability(event.target.value);
    }
  }

  minPriceFilter(event: any) {
    if (+event.target.value !== 0) {
      this.minValue = event.target.value;
      if (this.maxValue === 0) {
        this.maxValue = this.serviceStore.maxValueProduct;
      }
      this.serviceStore.filterByPrice(this.minValue, this.maxValue);
    }
  }

  maxPriceFilter(event: any) {
    if (+event.target.value !== 0) {
      this.maxValue = event.target.value;

      this.serviceStore.filterByPrice(this.minValue, this.maxValue);
    }
  }

  filterMaxQuantity(event: any) {
    if (+event.target.value !== 0) {
      this.serviceStore.filterByQuantity(event.target.value);
    }
  }
}
