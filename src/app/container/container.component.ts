import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  public categorias: Array<{id: number, nombre: string}>;
  constructor() {
    this.categorias = [];
  }

  ngOnInit() {
    this.categorias.push({id: 1, nombre: 'Vinos'});
    this.categorias.push({id: 1, nombre: 'Lacteos'});
  }

}
