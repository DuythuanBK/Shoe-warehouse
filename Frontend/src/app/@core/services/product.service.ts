import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, MultipleProduct, ProductParam, MultipleProductQuantity } from '../data/product';
import { getParamsStr } from '../data/param';
import { ConfigService } from './configService';
import { BACKEND_URL } from '../data/common';

@Injectable()
export class ProductService {
  private productsUrl = `${BACKEND_URL}/products`;
  constructor(private configService: ConfigService, private http: HttpClient) {
    console.log("producturl: " + configService.getApiUrl())
  }


  getProducts(params: ProductParam): Observable<MultipleProduct> {
    return this.http.get<MultipleProduct>(`${this.productsUrl}?${getParamsStr(params)}`);
  }

  getProductQuantity(params: ProductParam): Observable<MultipleProductQuantity> {
    return this.http.get<MultipleProductQuantity>(`${this.productsUrl}/quantity?${getParamsStr(params)}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product);
  }

  createProduct(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.productsUrl, formData);
  }

  updateProduct(product: Product): Observable<void> {
    return this.http.put<void>(this.productsUrl, product);
  }

  deleteProduct(product: Product): Observable<void> {
    return this.http.delete<void>(this.productsUrl, {body: product});
  }
}
