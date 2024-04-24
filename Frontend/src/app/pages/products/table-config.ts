export var COLUMN_CONFIG = [
  {
    label: 'Code',
    prop: 'code',
    type: 'input',
    required: true,
    rule: {
      validators: [{ required: true }],
    },
  },
  {
    label:"image",
    prop: 'image',
    type: 'upload'
  },
  {
    label: 'Note',
    prop: 'note',
    type: 'input',
  }, 
];

export var TABLE_WITH_CONFIG = [
  {
    field: 'code',
    width: '200px',
  },
  {
    field: 'image',
    width: '200px',
  },
  {
    field: 'note',
    width: '100px',
  },
  
];