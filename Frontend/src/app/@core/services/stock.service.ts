import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StockParam, getParamsStr } from '../data/param';
import { Observable } from 'rxjs';
import { MultipleStock, Stock } from '../data/stock';
import { ConfigService } from './configService';
import { BACKEND_URL } from '../data/common';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  
  private url = `${BACKEND_URL}/stock`

  constructor(private configService: ConfigService, private http: HttpClient) {
  }

  getStock(params: StockParam): Observable<MultipleStock> {
    return this.http.get<MultipleStock>(`${this.url}?${getParamsStr(params)}`);
  }

  addStock(stock: Stock): Observable<Stock> {
    return this.http.post<Stock>(this.url, stock);
  }

  updateStock(stock: Stock): Observable<void> {
    return this.http.put<void>(this.url, stock);
  }

  deleteStock(stock: Stock): Observable<void> {
    return this.http.delete<void>(this.url, {"body": stock});
  }

  exportStocks() {
    this.http.get(`${this.url}/export_excel`, {
      responseType: 'blob'
    }).subscribe(blob => {
      this.saveFile(blob);
    });
  }

  private saveFile(blob: Blob): void {
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = 'stocks.xlsx';
    downloadLink.click();
  }

}
