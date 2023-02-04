import { Observable } from 'rxjs';
import {
  ICreateProduct,
  IImportProduct,
  IProduct,
  IShipProduct,
} from './warehouse.interface';

export interface IWarehouseMiddleware {
  products$: Observable<IProduct[]>;
  loadProducts$(): Observable<IProduct[]>;
  getProduct$(productName: string): Observable<IProduct>;
  createProduct$(product: ICreateProduct): Observable<IProduct>;
  importProduct$(product: IImportProduct): Observable<IProduct>;
  shipProduct$(product: IShipProduct): Observable<IProduct>;
}

export const warehouseMiddlewareDiToken = Symbol('WAREHOUSE_MIDDLEWARE');
