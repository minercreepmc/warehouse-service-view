export interface IProduct {
  name: string;
  quantity: number;
}

export interface IProductCreate {
  name: string;
}

export type IProductImport = IProduct;

export type IProducts = IProduct[];
