import {
  schemaMigrations,
  createTable,
} from '@nozbe/watermelondb/Schema/migrations';

export default schemaMigrations({
  migrations: [
    {
      // ⚠️ Set this to a number one larger than the current schema version
      toVersion: 2,
      steps: [
        // See "Migrations API" for more details
        createTable({
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
    },
  ],
});
