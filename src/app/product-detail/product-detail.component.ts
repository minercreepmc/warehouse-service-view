import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IProduct,
  IProductImport,
  WarehouseService,
} from '@services/warehouse';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product?: IProduct;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly warehouseService: WarehouseService,
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const name = this.route.snapshot.paramMap.get('name') || '';
    console.log(name);
    this.warehouseService
      .getProduct(name)
      .subscribe((product) => (this.product = product));
  }

  importProduct(product: IProductImport) {
    // Handler differenly
    console.log(product);
    if (product.name && product.quantity) {
      this.warehouseService
        .importProduct(product)
        .subscribe((productImported) => {
          console.log(productImported);
        });
      this.router.navigate(['products']);
    }
  }

  shipProduct(amount: number) {
    if (amount) {
      console.log('ship ' + amount);
      this.router.navigate(['products']);
    }
  }
}
