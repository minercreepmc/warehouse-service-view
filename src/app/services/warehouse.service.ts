import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProducts } from './warehouse.interface';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  constructor(private readonly http: HttpClient) {}

  getProducts() {
    return this.http.get<IProducts>('http://localhost:3000/products');
  }
}
