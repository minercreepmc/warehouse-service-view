import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '@services/warehouse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Warehouse Service';

  constructor(private readonly warehouseService: WarehouseService) {}

  ngOnInit(): void {
    this.warehouseService.loadProducts().subscribe();
  }
}
