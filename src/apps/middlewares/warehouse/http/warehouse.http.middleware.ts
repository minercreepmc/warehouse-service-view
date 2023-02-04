import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  delay,
  first,
  map,
  Observable,
  retry,
  tap,
  throwError,
} from 'rxjs';
import {
  IProduct,
  ICreateProduct,
  IImportProduct,
  IProducts,
  IShipProduct,
} from '../warehouse.interface';

@Injectable({
  providedIn: 'root',
})
export class WarehouseHttpMiddleware {
  private readonly url = 'http://localhost:3000/products';
  private readonly createUrl = 'http://localhost:3000/products/create';
  private readonly importUrl = 'http://localhost:3000/products/import';
  private readonly shipUrl = 'http://localhost:3000/products/ship';
  readonly products = new BehaviorSubject<IProducts>([]);
  constructor(private readonly http: HttpClient) {}

  get products$() {
    return this.products.asObservable();
  }

  loadProducts$() {
    const productGetting$ = this.http.get<IProduct[]>(this.url).pipe(
      tap((products: IProduct[]) => {
        this.products.next(products);
      }),
      retry(2),
      catchError(this.handleError),
    );
    return productGetting$;
  }

  createProduct$(product: ICreateProduct): Observable<IProduct> {
    const newProduct$ = this.http.post<IProduct>(`${this.url}/create`, product);
    return newProduct$.pipe(
      first(),
      map((newProduct: IProduct) => ({ ...newProduct, quantity: 0 })),
      tap((newProduct: IProduct) => {
        this.products.next([...this.products.getValue(), newProduct]);
      }),
    );
  }

  getProduct$(productName: string): Observable<IProduct> {
    const url = `${this.url}/${productName}`;
    return this.http.get<IProduct>(url);
  }

  importProduct$(product: IImportProduct): Observable<IProduct> {
    const productImporting$ = this.http.post<IProduct>(
      `${this.url}/imports`,
      product,
    );
    return productImporting$.pipe(first(), delay(1000));
  }

  shipProduct$(product: IShipProduct): Observable<IProduct> {
    const productShipping$ = this.http.post<IProduct>(this.shipUrl, product);
    return productShipping$.pipe(first(), delay(1000));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err);
  }
}
