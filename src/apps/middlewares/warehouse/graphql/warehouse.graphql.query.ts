import { gql } from 'apollo-angular';
import {
  ICreateProduct,
  IImportProduct,
  IProduct,
  IShipProduct,
} from '../warehouse.interface';

export const getProductsQuery = () => gql<{ products: IProduct[] }, null>`
  query {
    products {
      name
      quantity
    }
  }
`;

export const getProductQuery = gql<{ product: IProduct }, { name: string }>`
  query ($name: String!) {
    product(data: { name: $name }) {
      id
      name
      quantity
    }
  }
`;

export const createProductMutaton = gql<{ product: IProduct }, ICreateProduct>`
    mutation ($dto: ICreateProduct) {
    createProduct(dto: { name: $dto.name}) {
      name
    }
  }
`;

export const importProductsMutation = gql<
  { product: IProduct },
  IImportProduct
>`
  mutation ($dto: IImportProduct) {
    importProducts(dto: { name: $dto.name , quantity: $product.quantity }) {
      name
      quantity
    }
  }
`;

export const shipProductsMutation = (product: IShipProduct) => gql<
  { product: IProduct },
  IShipProduct
>`
  mutation ($dto: IShipProduct) {
    shipProducts(dto: { name: product.name, quantity: product.quantity }) {
      name
      quantity
      message
    }
  }
`;
