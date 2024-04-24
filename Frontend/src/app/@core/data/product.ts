import { BaseParam } from "./param";

export interface Product {
  id?: number;
  code?: string;
  image?: string;
  note?: string;
}

export interface MultipleProduct {
  products: Product[];
  productsCount: number;
}

export interface ProductParam extends BaseParam {
  code?: string
}


export interface ProductQuantity extends Product {
  stockQuantity?: number;
  importQuantity?: number;
}


export interface MultipleProductQuantity {
  products?: ProductQuantity[];
  productsCount?: number;
}