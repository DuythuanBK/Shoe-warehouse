export interface Order {
  id?: number;
  customer?: Customer;
  productCode?: string;
  quantity?: number;
  weight?: string;
  price?: string;
  shipTime?: string;
  shipService?: string;
  status?: string;
  note?: string;
}


export interface DisplayOrder {
  id?: number;
  customerId?: number;
  phoneNumber?: string;
  address?: string;
  name?: string;
  productCode?: string;
  quantity?: number;
  weight?: string;
  price?: string;
  shipTime?: string;
  shipService?: string;
  status?: string;
  note?: string;
}

export interface Customer {
  id?: number;
  phoneNumber?: string;
  address?: string;
  name?: string;
}

export interface MultipleOrder {
  orders?: Order[];
  orderCount?: number;
}

