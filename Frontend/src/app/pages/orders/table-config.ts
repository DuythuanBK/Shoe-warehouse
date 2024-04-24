export var COLUMN_CONFIG = [
  {
    label: 'Phone number',
    prop: 'phoneNumber',
    type: 'input',
  },
  {
    label: 'Customer name',
    prop: 'name',
    type: 'input',
    rule: {
      validators: [{ required: true }],
    },
  },
  {
    label: 'Address',
    prop: 'address',
    type: 'input',
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
    label: 'Weight',
    prop: 'weight',
    type: 'input',
  },
  {
    label: 'Price',
    prop: 'price',
    type: 'input',
  },
  {
    label: 'Ship time',
    prop: 'shipTime',
    type: 'select',
    options: ["Cả ngày", "Sáng", "Chiều", "Tối", "Giờ hành chính"]
  },
  {
    label: 'Ship service',
    prop: 'shipService',
    type: 'select',
    options: ["VLS7"]
  },
  {
    label: 'Status',
    prop: 'status',
    type: 'select',
    options: ["Đang chuẩn bị hàng", "Đang giao", "Đã hủy", "Giao thành công"]
  },
  {
    label: 'note',
    prop: 'note',
    type: 'input',
  },
];

export var TABLE_WITH_CONFIG = [
  {
    field: 'phoneNumber',
    width: '150px',
  },
  {
    field: 'name',
    width: '150px',
  },
  {
    field: 'address',
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
    field: 'weight',
    width: '100px',
  },
  {
    field: 'price',
    width: '100px',
  },
  {
    field: 'shipTime',
    width: '150px',
  },
  {
    field: 'shipService',
    width: '100px',
  },
  {
    field: 'Status',
    width: '150px',
  },
  {
    field: 'note',
    width: '200px',
  },
];
