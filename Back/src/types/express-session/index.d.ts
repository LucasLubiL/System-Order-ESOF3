import 'express-session';

declare module 'express-session' {
  interface SessionData {
    funcionarioId?: number;
    funcionarioNome?: string;
  }
}