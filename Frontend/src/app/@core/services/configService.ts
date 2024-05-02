import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiUrl: string = '';
  constructor(private http: HttpClient) {
    this.http.get<any>('assets/config/appConfig.json').subscribe((res) => {
      this.apiUrl = res.apiUrl;
    })
  }

  public getApiUrl(): string {
    if(this.apiUrl == '') {
      return 'http://localhost:8080/api';
    }
    return this.apiUrl;
  }
}
