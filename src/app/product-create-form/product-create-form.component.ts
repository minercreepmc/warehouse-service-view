import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { WarehouseService } from '@services/warehouse';

@Component({
  selector: 'app-product-create-form',
  templateUrl: './product-create-form.component.html',
  styleUrls: ['./product-create-form.component.css'],
})
export class ProductCreateFormComponent {
  name = new FormControl('');

  constructor(
    private readonly warehouseService: WarehouseService,
    private readonly router: Router,
  ) {}

  clearForm() {
    this.name.setValue('');
  }

  createProduct() {
    if (this.name.value) {
      const productCreating$ = this.warehouseService.createProduct({
        name: this.name.value,
      });
      productCreating$.subscribe((newProduct) => {
        this.clearForm();
        this.router.navigate(['']);
      });
    }
  }
}
