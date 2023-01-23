import { Component, Input, OnInit } from '@angular/core';
import { IProducts } from '@services/warehouse.interface';
import { WarehouseService } from '@services/warehouse.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: IProducts | undefined;

  constructor(private readonly warehouseService: WarehouseService) {}

  ngOnInit() {
    this.warehouseService
      .getProducts()
      .subscribe((products: IProducts) => (this.products = products));
  }
}
