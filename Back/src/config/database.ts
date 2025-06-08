import { Client } from 'pg';

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'ServiceOrder',
  password: 'postgres',
  port: 5432,
});

export default client;