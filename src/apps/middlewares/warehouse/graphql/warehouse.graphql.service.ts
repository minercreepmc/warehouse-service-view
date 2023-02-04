import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  BehaviorSubject,
  catchError,
  Observable,
  retry,
  throwError,
} from 'rxjs';
import { delay, first, map } from 'rxjs/operators';
import {
  createProductMutaton,
  getProductQuery,
  getProductsQuery,
  importProductsMutation,
  shipProductsMutation,
} from './warehouse.graphql.query';
import {
  IImportProduct,
  IProduct,
  ICreateProduct,
  IProducts,
  IShipProduct,
} from './warehouse.interface';

@Injectable({
  providedIn: 'root',
})
export class WarehouseGraphqlService {
  error: any;
  readonly products = new BehaviorSubject<IProducts>([]);

  get products$() {
    return this.products.asObservable();
  }

  constructor(private readonly apollo: Apollo) {}

  loadProducts$() {
    return this.apollo
      .watchQuery({
        query: getProductsQuery(),
      })
      .valueChanges.pipe(
        map((result) => {
          return result.data.products;
        }),
        map((products: IProduct[]) => {
          this.products.next(products);
        }),
        catchError(this.handleError),
      );
  }

  getProduct$(productName: string) {
    return this.apollo
      .watchQuery({
        query: getProductQuery(productName),
        variables: {
          pro,
        },
      })
      .valueChanges.pipe(
        map((result) => {
          return result.data.product;
        }),
        retry(2),
        catchError(this.handleError),
      );
  }

  createProduct$(product: ICreateProduct) {
    return this.apollo
      .mutate({
        mutation: createProductMutaton(product),
      })
      .pipe(
        map((result) => result.data?.product),
        first(),
        delay(1000),
      );
  }

  importProduct$(product: IImportProduct) {
    return this.apollo
      .mutate({
        mutation: importProductsMutation(product),
      })
      .pipe(
        map((result) => result.data?.product),
        first(),
        delay(1000),
      );
  }

  shipProduct$(product: IShipProduct) {
    return this.apollo
      .mutate({
        mutation: shipProductsMutation(product),
      })
      .pipe(
        map((result) => result.data?.product),
        first(),
        delay(1000),
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err);
  }
}
