export var COLUMN_CONFIG = [
  {
    label: 'Phone number',
    prop: 'phoneNumber',
    required: true,
    type: 'input',
  },
  {
    label: 'Customer name',
    prop: 'name',
    required: true,
    type: 'input',
    rule: {
      validators: [{ required: true }],
    },
  },
  {
    label: 'Address',
    prop: 'address',
    required: true,
    type: 'input',
  },
  {
    label: 'Product code',
    prop: 'productCode',
    required: true,
    type: 'input',
  },
  {
    label: 'Quantity',
    prop: 'quantity',
    required: true,
    type: 'input',
  },
  {
    label: 'Weight',
    prop: 'weight',
    required: true,
    type: 'input',
  },
  {
    label: 'Price',
    prop: 'price',
    required: true,
    type: 'input',
  },
  {
    label: 'Ship time',
    prop: 'shipTime',
    required: true,
    type: 'select',
    options: ["Cả ngày", "Sáng", "Chiều", "Tối", "Giờ hành chính"]
  },
  {
    label: 'Ship service',
    prop: 'shipService',
    required: true,
    type: 'select',
    options: ["VLS7"]
  },
  {
    label: 'Status',
    prop: 'status',
    required: true,
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
