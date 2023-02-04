import { Component, Inject, OnInit } from '@angular/core';
import {
  IProduct,
  IWarehouseMiddleware,
  warehouseMiddlewareDiToken,
} from '@middlewares/warehouse';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];

  constructor(
    @Inject(warehouseMiddlewareDiToken)
    private readonly warehouseWarehouse: IWarehouseMiddleware,
  ) {}
  ngOnInit(): void {
    this.warehouseWarehouse.products$.subscribe(
      (products) => (this.products = products),
    );
  }
}
