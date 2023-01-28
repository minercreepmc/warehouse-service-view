import { Component } from '@angular/core';
import { IProducts, WarehouseService } from '@services/warehouse';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: IProducts = [];

  constructor(warehouseService: WarehouseService) {
    warehouseService.products$.subscribe(
      (products) => (this.products = products),
    );
  }
}
