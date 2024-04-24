export var COLUMN_CONFIG = [
  {
    label: 'Date',
    prop: 'date',
    type: 'datePicker',
    required: true,
    rule: {
      validators: [{ required: true }],
    },
  },
  {
    label: 'Total',
    prop: 'total',
    type: 'input',
    rule: {
      validators: [{ required: true }],
    },
  },
  {
    label: 'Note',
    prop: 'note',
    type: 'input',
    
  },  
];

export var TABLE_WITH_CONFIG = [
  {
    field: 'date',
    width: '150px',
  },
  {
    field: 'total',
    width: '200px',
  },
  {
    field: 'note',
    width: '100px',
  },
  {
    field: 'actions',
    width: '100px',
  },
];