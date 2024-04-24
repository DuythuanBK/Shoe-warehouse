export var COLUMN_CONFIG = [
  {
    label: 'Phone Number',
    prop: 'phoneNumber',
    type: 'input',
    required: true,
    rule: {
      validators: [{ required: true }],
    },
  },
  {
    label: 'Name',
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
];

export var TABLE_WITH_CONFIG = [
  {
    field: 'phoneNumber',
    width: '100px',
  },
  {
    field: 'Name',
    width: '150px',
  },
  {
    field: 'Address',
    width: '200px',
  },
  {
    field: 'Actions',
    width: '100px',
  },
];