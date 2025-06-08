import express, { Request, Response } from 'express';
import session from 'express-session';
import cors from 'cors';
import usuarioRoutes from './routes/usuario.routes';
import funcionarioRoutes from './routes/funcionario.routes';
import clienteRoutes from './routes/cliente.routes';
import pagamentoRoutes from './routes/pagamento.routes';
import servicoRoutes from './routes/servico.routes';
import ordemRoutes from './routes/ordem.routes';
import receberRoutes from './routes/receber.routes';
import client from './config/database';

console.log("✅ Servidor carregado corretamente");

const app = express();
const port = 3000;

// Middleware para permitir requisições de outras origens (frontend)
app.use(cors({
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"], // ou o endereço onde está rodando seu frontend
  credentials: true               // ESSENCIAL para sessão
}));

// Middleware para aceitar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Testar conexão com banco ao iniciar servidor
client.connect()
  .then(() => console.log('🔌 Conectado ao PostgreSQL com sucesso!'))
  .catch((err) => {
    console.error('❌ Erro de conexão com o banco de dados:', err);
    process.exit(1); // Se falhar ao conectar, encerra o servidor
  });

app.use(session({
  secret: 'chave-super-secreta', // você pode trocar isso por uma chave forte
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2, // sessão dura 2 horas
    sameSite: "lax",
    secure: false,
  }
}));

// Rotas principais do sistema
app.use('/usuarios', usuarioRoutes);
app.use('/funcionario', funcionarioRoutes);
app.use('/cliente', clienteRoutes);
app.use('/pagamento', pagamentoRoutes);
app.use('/servico', servicoRoutes);
app.use('/ordem', ordemRoutes);
app.use('/receber', receberRoutes);

app.get('/testeee', (req: Request, res: Response) => {
  res.send('Servidor está funcionando!');
});

// Caso nenhuma rota seja encontrada:
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});

