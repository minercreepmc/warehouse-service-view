export interface IProduct {
  message?: string;
  name: string;
  quantity: number;
}

export interface ICreateProduct {
  name: string;
}

export type IImportProduct = IProduct;
export type IShipProduct = IProduct;

export type IProducts = IProduct[];
