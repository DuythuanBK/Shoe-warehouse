export var COLUMN_CONFIG = [
  {
    label: 'Product',
    prop: 'product',
    type: 'input',
    required: true,
    rule: {
      validators: [{ required: true }],
    },
  },
  {
    label: 'Quantity',
    prop: 'quantity',
    type: 'input',
  }, 
];

export var TABLE_WITH_CONFIG = [
  {
    field: 'product',
    width: '200px',
  },
  {
    field: 'quantity',
    width: '100px',
  },
];