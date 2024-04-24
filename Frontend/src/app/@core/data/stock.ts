export interface Stock {
  id?: number;
  productCode?:  string;
  quantity?: number;
}


export interface MultipleStock {
  stocks?: Stock[];
  stockCount?: number;
}

