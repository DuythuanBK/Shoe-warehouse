export var COLUMN_CONFIG = [
  {
    label: 'Ship Code',
    prop: 'shipCode',
    type: 'input',
    required: true,
    rule: {
      validators: [{ required: true }],
    },
  },
  {
    label: 'Order Code',
    prop: 'orderCode',
    type: 'input',
    rule: {
      validators: [{ required: true }],
    },
  },
  {
    label: 'Import Date',
    prop: 'importDate',
    type: 'datePicker',
    
  }, 
  {
    label: 'Product code',
    prop: 'productCode',
    type: 'input',
  },
  {
    label: 'Quantity',
    prop: 'quantity',
    type: 'input',
  },
  {
    label: 'Price',
    prop: 'price',
    type: 'input',
  },
  {
    label: 'Ship Fee',
    prop: 'shipFee',
    type: 'input',
  },
  {
    label: 'Status',
    prop: 'status',
    options: ["Đã nhập hàng", "Nhập kho", "Đã hủy", "Hàng đang về"],
    type: 'select',
  },
  {
    label: 'Note',
    prop: 'note',
    type: 'input',
  },
];

export var TABLE_WITH_CONFIG = [
  {
    field: 'shipCode',
    width: '150px',
  },
  {
    field: 'orderCode',
    width: '150px',
  },
  {
    field: 'importDate',
    width: '150px',
  },
  {
    field: 'productCode',
    width: '150px',
  },
  {
    field: 'quantity',
    width: '100px',
  },
  {
    field: 'price',
    width: '100px',
  },
  {
    field: 'shipFee',
    width: '100px',
  },
  {
    field: 'status',
    width: '100px',
  },
  {
    field: 'note',
    width: '200px',
  },
  {
    field: 'actions',
    width: '100px',
  },
];