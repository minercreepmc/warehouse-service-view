import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  first,
  map,
  Observable,
  retry,
  tap,
  throwError,
} from 'rxjs';
import {
  IProduct,
  IProductCreate,
  IProductImport,
  IProducts,
} from './warehouse.interface';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  private readonly url = 'http://localhost:3000/products';
  readonly products = new BehaviorSubject<IProducts>([]);
  constructor(private readonly http: HttpClient) {}

  get products$() {
    return this.products.asObservable();
  }

  loadProducts() {
    const productGetting$ = this.http.get<IProduct[]>(this.url).pipe(
      tap((products: IProduct[]) => {
        this.products.next(products);
      }),
      retry(2),
      catchError(this.handleError),
    );
    return productGetting$;
  }

  createProduct(product: IProductCreate): Observable<IProduct> {
    const newProduct$ = this.http.post<IProduct>(`${this.url}/create`, product);
    return newProduct$.pipe(
      first(),
      map((newProduct: IProduct) => ({ ...newProduct, quantity: 0 })),
      tap((newProduct: IProduct) => {
        this.products.next([...this.products.getValue(), newProduct]);
      }),
    );
  }

  getProduct(productName: string): Observable<IProduct> {
    const url = `${this.url}/${productName}`;
    return this.http.get<IProduct>(url);
  }

  importProduct(product: IProductImport): Observable<IProduct> {
    const productImporting$ = this.http.post<IProduct>(
      `${this.url}/imports`,
      product,
    );
    return productImporting$.pipe(
      first(),
      tap((productImported) => {
        console.log(productImported);
      }),
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err);
  }
}
