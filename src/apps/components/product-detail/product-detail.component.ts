import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IImportProduct,
  IProduct,
  IShipProduct,
  IWarehouseMiddleware,
  warehouseMiddlewareDiToken,
} from '@middlewares/warehouse';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [MessageService],
})
export class ProductDetailComponent implements OnInit {
  product: IProduct = {
    name: '',
    quantity: 0,
  };
  quantityForm = new FormControl(0);

  constructor(
    private readonly route: ActivatedRoute,
    @Inject(warehouseMiddlewareDiToken)
    private readonly warehouseMiddleware: IWarehouseMiddleware,
    private readonly messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const name = this.route.snapshot.paramMap.get('name') || '';
    this.warehouseMiddleware
      .getProduct$(name)
      .subscribe((product) => (this.product = product));
  }

  importProduct() {
    if (this.quantityForm.value && this.product.name) {
      const product: IImportProduct = {
        name: this.product.name,
        quantity: this.quantityForm.value,
      };
      this.warehouseMiddleware
        .importProduct$(product)
        .subscribe((productImported) => {
          if (productImported) {
            this.product.quantity += +productImported.quantity;
            this.loadProducts();
            this.messageService.add({
              severity: 'success',
              summary: 'Import Products',
              detail: productImported.message,
            });
            this.clearQuantityFormm();
          } else {
            throw new Error('implement');
          }
        });
    }
  }

  shipProduct() {
    if (this.quantityForm.value && this.product.name) {
      const product: IShipProduct = {
        name: this.product.name,
        quantity: this.quantityForm.value,
      };
      this.warehouseMiddleware
        .shipProduct$(product)
        .subscribe((productShipped) => {
          if (productShipped) {
            this.product.quantity += productShipped.quantity;
            this.loadProducts();
            this.messageService.add({
              severity: 'success',
              summary: 'Ship Products',
              detail: productShipped.message,
            });
            this.clearQuantityFormm();
          } else {
            throw new Error('implement');
          }
        });
    }
  }

  loadProducts() {
    this.warehouseMiddleware.loadProducts$().subscribe();
  }

  clearQuantityFormm() {
    this.quantityForm.setValue(0);
  }

  clear() {
    this.messageService.clear();
  }
}
