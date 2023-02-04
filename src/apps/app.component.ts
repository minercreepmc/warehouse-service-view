import { Component, Inject, OnInit } from '@angular/core';
import {
  IWarehouseMiddleware,
  warehouseMiddlewareDiToken,
} from '@middlewares/warehouse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Warehouse Service';

  constructor(
    @Inject(warehouseMiddlewareDiToken)
    private readonly warehouseService: IWarehouseMiddleware,
  ) {}

  ngOnInit(): void {
    this.warehouseService.loadProducts$().subscribe();
  }
}
