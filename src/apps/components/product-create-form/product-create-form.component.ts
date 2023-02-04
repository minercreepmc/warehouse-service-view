import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IWarehouseMiddleware,
  warehouseMiddlewareDiToken,
} from '@middlewares/warehouse';

@Component({
  selector: 'app-product-create-form',
  templateUrl: './product-create-form.component.html',
  styleUrls: ['./product-create-form.component.css'],
})
export class ProductCreateFormComponent {
  name = new FormControl('');

  constructor(
    @Inject(warehouseMiddlewareDiToken)
    private readonly warehouseMiddleware: IWarehouseMiddleware,
    private readonly router: Router,
  ) {}

  clearForm() {
    this.name.setValue('');
  }

  createProduct() {
    if (this.name.value) {
      const productCreating$ = this.warehouseMiddleware.createProduct$({
        name: this.name.value,
      });
      productCreating$.subscribe(() => {
        this.clearForm();
        this.router.navigate(['']);
      });
    }
  }
}
