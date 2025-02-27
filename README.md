# API de Reserva de Restaurante

Esta é uma API desenvolvida para gerenciar reservas em um restaurante. A API foi construída usando Node.js, Express, Sequelize, PostgreSQL, Multer, CORS e Dotenv. Ela permite que os usuários façam reservas, consultem disponibilidade, e gerenciem suas reservas de forma eficiente.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para construção de aplicações web e APIs.
- **Sequelize**: ORM (Object-Relational Mapping) para Node.js, utilizado para interagir com o banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar os dados da aplicação.
- **Multer**: Middleware para manipulação de upload de arquivos.
- **CORS**: Middleware para permitir requisições de diferentes origens.
- **Dotenv**: Biblioteca para gerenciar variáveis de ambiente.

## Requisitos

- Node.js (v14 ou superior)
- PostgreSQL (v12 ou superior)
- NPM ou Yarn

## Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seu-usuario/api-reserva-restaurante.git
   cd api-reserva-restaurante


2. **Instale as dependências**

   ```bash
   npm install

3. **Configure o banco de dados**
   ```bash
   PORT=5000
   DATABASE_USER=postgres
   DATABASE_PASSWORD=senha123
   DATABASE_NAME=restaurante
   DATABASE_PORT=5432
   DATABASE_HOST=localhost
   JWT_SECRET_KEY=chave_aleatoria

4. **Execute as migrações**
   ```bash
   npx sequelize-cli db:migrate

5. **Inicie o servidor**
   ```bash
   npm start

O servidor estará rodando em http://localhost:5000.


# Endpoints da API

## Autenticação
    ```bash                  
    POST /usuarios/registrar 
— Cadastro de novos usuários.

    ```bash
    POST /usuarios/login
— Login de usuários e geração de token JWT.
## Mesas
    ```bash
    GET /mesas
— Lista todas as mesas e seus status.
POST /mesas — Adiciona uma nova mesa (apenas administradores).
PATCH /mesas/:id — Atualiza informações de uma mesa.
DELETE /mesas/:id — Remove uma mesa (apenas administradores).
Reservas
POST /reservas — Cria uma nova reserva, validando disponibilidade e a capacidade da mesa.
GET /reservas — Lista todas as reservas do usuário autenticado.
PATCH /reservas/:id/cancelar — Cancela uma reserva ativa.
