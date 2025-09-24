# 🛠️ ServiceOrder - Sistema de Ordens de Serviço

<p align="center">
  <img src="https://img.shields.io/badge/Status-Finalizado-brightgreen?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge"/>
</p>

## 📌 Sobre o projeto
O **ServiceOrder** é um sistema completo para gerenciamento de **ordens de serviço**, permitindo o cadastro de clientes, funcionários, usuários, serviços e pagamentos, além da criação, acompanhamento e finalização de ordens.  

👉 O sistema foi projetado para atender tanto **ordens de manutenção física (hardware/PC)** realizadas por técnicos, quanto **ordens de software/sistema**, que podem ser direcionadas ao **desenvolvedor** para resolução remota.  

---

## 🎯 Objetivos principais
- ✔️ Gerenciar cadastros de usuários, clientes, funcionários e serviços  
- ✔️ Criar e acompanhar ordens de serviço (hardware e software)  
- ✔️ Registrar pagamentos e relatórios técnicos  
- ✔️ Permitir integração de regras de negócio no backend  
- ✔️ Sistema modular com **POO e camadas (BO, DAO, Controllers, Models e Routes)**  
- ✔️ Sessão persistente com `express-session`  

---

## 🚀 Tecnologias utilizadas

### **Frontend**
<p>
  <img src="https://skillicons.dev/icons?i=html,css,typescript" />
</p>

### **Backend**
<p>
  <img src="https://skillicons.dev/icons?i=nodejs,express,typescript" />
</p>

### **Banco de Dados**
<p>
  <img src="https://skillicons.dev/icons?i=postgres" />
</p>

---

## 📂 Estrutura do projeto

```bash
ServiceOrder/
│
├── Front/                # Frontend
│   ├── HTML/             # Páginas (index.html, principal.html, cadastros etc.)
│   ├── CSS/              # Estilos
│   ├── TS/               # Lógica em TypeScript
│   └── dist/             # Arquivos compilados
│
├── Back/                 # Backend
│   ├── BO/               # Regras de negócio
│   ├── config/           # Configurações (ex: conexão com banco)
│   ├── controllers/      # Controladores (recebem requisições)
│   ├── dao/              # Data Access Object (acesso ao banco)
│   ├── models/           # Modelos (entidades)
│   ├── routes/           # Rotas da API
│   ├── utils/            # Utilitários (ex: tipagem de sessão)
│   └── server.ts         # Ponto de entrada
