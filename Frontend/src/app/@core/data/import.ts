export interface Import {
  id?: number;
  shipCode?: String;
  orderCode?: string;
  importDate?: Date;
  productCode?: String;
  quantity?: number;
  price?: String;
  shipFee?: String;
  status?: String;
  note?: String;
}

export interface MultipleImport {
  imports?: Import[];
  importCount?: number;
}