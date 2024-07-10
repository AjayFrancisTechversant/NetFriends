import {appSchema, tableSchema} from '@nozbe/watermelondb';

export const mySchema = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: 'notes',
      columns: [
        {name: 'title', type: 'string'},
        {name: 'desc', type: 'string'},
        {name: 'created_at', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'users',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'age', type: 'number'},
        {name: 'gender', type: 'string'},
        {name: 'email', type: 'string'},
        {name: 'phone', type: 'string'},
      ],
    }),
  ],
});
