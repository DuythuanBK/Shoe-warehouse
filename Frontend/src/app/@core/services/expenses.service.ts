import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expenses, MultipleExpenes } from '../data/expenses';
import { ExpensesParam, getParamsStr } from '../data/param';
import { Observable } from 'rxjs';
import { ConfigService } from './configService';
import { BACKEND_URL } from '../data/common';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private url = `${BACKEND_URL}/expenses`

  constructor(private configService: ConfigService, private http: HttpClient) {
  }

  getExpenses(params: ExpensesParam): Observable<MultipleExpenes> {
    return this.http.get<MultipleExpenes>(`${this.url}?${getParamsStr(params)}`);
  }

  addExpense(expense: Expenses): Observable<Expenses> {
    return this.http.post<Expenses>(this.url, expense);
  }

  updateExpense(expense: Expenses): Observable<void> {
    return this.http.put<void>(this.url, expense);
  }

  deleteExpense(expense: Expenses): Observable<void> {
    return this.http.delete<void>(this.url, {"body": expense});
  }

}
