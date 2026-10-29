# ServiceOrder: Sistema de Ordens de Serviço

![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=nodedotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?style=for-the-badge&logo=postgresql)

Sistema para gerenciamento de ordens de serviço, com cadastro de clientes, funcionários, usuários, serviços e pagamentos, além da criação, acompanhamento e finalização das ordens.

O sistema atende dois tipos de ordem: manutenção física (hardware e PC), executada por técnicos, e ordens de software, que podem ser direcionadas ao desenvolvedor para resolução remota.

Projeto da disciplina de Engenharia de Software (ESOF3), no curso de Análise e Desenvolvimento de Sistemas.

## Funcionalidades

- Cadastro e gerenciamento de usuários, clientes, funcionários e serviços
- Criação e acompanhamento de ordens de serviço de hardware e software
- Registro de pagamentos e relatórios técnicos
- Regras de negócio centralizadas no back-end
- Sessão persistente de usuário com `express-session`

## Arquitetura

O back-end segue Programação Orientada a Objetos e separação em camadas, cada uma com uma responsabilidade:

| Camada | Responsabilidade |
|---|---|
| `routes` | Define as rotas da API |
| `controllers` | Recebem as requisições e devolvem as respostas |
| `BO` | Regras de negócio |
| `dao` | Acesso ao banco de dados |
| `models` | Entidades do sistema |
| `config` | Configurações, como a conexão com o banco |

## Tecnologias

| Camada | Tecnologias |
|---|---|
| Front-end | HTML, CSS e TypeScript |
| Back-end | Node.js, Express e TypeScript |
| Banco de dados | PostgreSQL |

## Estrutura do projeto

```
ServiceOrder/
├── Front/                # Front-end
│   ├── HTML/             # Páginas (index, principal, cadastros etc.)
│   ├── CSS/              # Estilos
│   ├── TS/               # Lógica em TypeScript
│   └── dist/             # Arquivos compilados
│
├── Back/                 # Back-end
│   ├── BO/               # Regras de negócio
│   ├── config/           # Configurações (ex.: conexão com banco)
│   ├── controllers/      # Controladores
│   ├── dao/              # Acesso ao banco (Data Access Object)
│   ├── models/           # Entidades
│   ├── routes/           # Rotas da API
│   ├── utils/            # Utilitários (ex.: tipagem de sessão)
│   └── server.ts         # Ponto de entrada
│
├── Banco/                # Scripts do banco de dados
└── Testes/               # Testes
```

## Como executar

**Pré-requisitos:** Node.js e PostgreSQL instalados.

```bash
git clone https://github.com/LucasLubiL/System-Order-ESOF3.git
cd System-Order-ESOF3
npm install
```

1. Crie o banco de dados no PostgreSQL usando os scripts da pasta `Banco/`.
2. Ajuste as credenciais de conexão em `Back/config/`.
3. Inicie o servidor. Os comandos de instalação e de limpeza de cache usados no projeto estão nos arquivos `.txt` da raiz do repositório.

---

## Autor

**Lucas Amaral Luciano**
Desenvolvedor Full Stack Java e Angular, formado em Análise e Desenvolvimento de Sistemas pelo IFTM.

Projeto acadêmico da disciplina de Engenharia de Software, no IFTM Campus Patrocínio.

[![Portfólio](https://img.shields.io/badge/Portf%C3%B3lio-lucasamaral.dev-1f2937?style=for-the-badge&logo=googlechrome&logoColor=white)](https://lucasamaral.dev/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-lucas--amaral--luciano-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/lucas-amaral-luciano)
[![GitHub](https://img.shields.io/badge/GitHub-LucasLubiL-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/LucasLubiL)
[![E-mail](https://img.shields.io/badge/E--mail-tech.lucas.amaral%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:tech.lucas.amaral@gmail.com)
