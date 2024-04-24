import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface ListPager {
  pageSize?: number;
  pageIndex?: number;
}

export interface Item {
  id?: string;
  shippingCode?: String;
  orderCode?: string;
  importDate?: Date;
  productCode?: String;
  quantity?: String;
  price?: String;
  shipFee?: String;
  status?: String;
  note?: String;
}

@Injectable()
export class ListDataService {
  private basicData: Item[] = [];

  private pagerList(data, pager) {
    return data.slice(pager.pageSize * (pager.pageIndex - 1), pager.pageSize * pager.pageIndex);
  }

  getListData(pager: ListPager): Observable<any> {
    return observableOf({
      pageList: this.pagerList(this.basicData, pager),
      total: this.basicData.length,
    }).pipe(delay(1000));
  }
}
