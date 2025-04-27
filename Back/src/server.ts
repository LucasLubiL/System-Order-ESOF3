import express, { Request, Response } from 'express';
import { Client } from 'pg';

const app = express();
const port = 3001; // Porta do servidor

// Middleware para ler JSON
app.use(express.json());

// Conectar ao banco de dados PostgreSQL
const client = new Client({
  user: 'postgres', // Substitua pelo seu usuário do banco
  host: 'localhost',
  database: 'ServiceOrder',
  password: 'postgres', // Substitua pela sua senha
  port: 5432,
});

client.connect()
  .then(() => console.log('Conectado ao PostgreSQL!'))
  .catch((err) => console.error('Erro de conexão com o banco:', err));

// Rota simples para testar o servidor
app.get('/', (req: Request, res: Response) => {
  res.send('Servidor está funcionando!');
});

// Teste de comunicação com o banco
app.get('/test', async (req: Request, res: Response) => {
  try {
    const result = await client.query('SELECT * from funcionario');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao acessar o banco de dados:', err);
    res.status(500).json({ error: 'Erro ao acessar o banco de dados' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na http://localhost:${port}`);
});
