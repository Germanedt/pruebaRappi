import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(public serviceHttp: Http) {
    console.log('Inicio provider');
  }
}
