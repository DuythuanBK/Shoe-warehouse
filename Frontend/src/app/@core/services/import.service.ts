import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImportParam, getParamsStr } from '../data/param';
import { Observable } from 'rxjs';
import { Import, MultipleImport } from '../data/import';
import { ConfigService } from './configService';
import { BACKEND_URL } from '../data/common';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  private url = `${BACKEND_URL}/imports`

  constructor(private configService: ConfigService, private http: HttpClient) {
  }

  getImports(params: ImportParam): Observable<MultipleImport> {
    return this.http.get<MultipleImport>(`${this.url}?${getParamsStr(params)}`);
  }

  addImport(im: Import): Observable<Import> {
    return this.http.post<Import>(this.url, im);
  }

  updateImport(im: Import): Observable<void> {
    return this.http.put<void>(this.url, im);
  }

  deleteImport(im: Import): Observable<void> {
    return this.http.delete<void>(this.url, {"body": im});
  }
}
