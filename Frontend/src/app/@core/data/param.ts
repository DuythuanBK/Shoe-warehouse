export interface BaseParam {
  offset: number;
  limit: number
}


export interface OrderParam extends BaseParam {
  name?: string;
  status?: string;
  phoneNumber?: string;
  customerName?: string;
  productCode?: string;
}

export interface ExpensesParam extends BaseParam {
  date?: string;
}

export interface ImportParam extends BaseParam {
  shipCode?: string;
  orderCode?: string;
  importDate?: string;
  productCode?: string;
  status?: string;
}

export interface StockParam extends BaseParam {
  code?: string;
}

export function getParamsStr(params: BaseParam): string {
  let ret = '';
  let idx = 0;
  for(const key in params) {
    if(params.hasOwnProperty(key)) {
      const value = params[key];
      if(value !== null && value !== '') {
        if(idx === 0) {
          ret += key + '=' + value;
          idx = 1;
        } else {
          ret += '&' + key + '=' + value;
        }
      }
    }
  }
  return ret;
}
