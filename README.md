# Navedex-api

### Pre-Requisitos para executar o projeto

- [Nodejs: Necessário para rodar o projeto](https://nodejs.org/)

- [ Docker: Necessário para rodar o container com o banco de dados](https://docs.docker.com/get-docker/)

- [docker-compose: Necessário para subir o container](https://docs.docker.com/compose/install/)

### Libs e tecnologias utilizadas

- [Sequelize ORM](https://sequelize.org/master/)
- [Express](https://expressjs.com/en/guide/routing.html)
- PostgreSQL
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Sucrase](https://www.npmjs.com/package/sucrase)
- JWT
- [Bcrypt](https://www.npmjs.com/package/bcrypt)

## Configuração

### Instalando dependencias

`yarn` ou `npm install`

### Rodando o server

Para rodar a api, é necesario subir o container com o bancode de dados e rodar as migrations do sequelize, conforme descrito abaixo:

Para subir o container com o banco de dados:

    `sudo docker-compose up -d` ou `docker-compose up -d`

Para rodar as migrations:

    `yarn migration:up` ou `npm run migration:up`

Para rodar o server:

    `yarn dev` ou `npm run dev`

## Funcionalidades

A api foi desenvolvida utilizando o padra rest, abaixo serão listados as rotas disponibilizadas pela aplicação:

### Autenticação

- Rota de cadastro de Usuario:

  - Rota utilizada para cadastrar um novo usuario:

          http://localhost:3333/singup

  - Para cadastrar um usuario, deve ser informado o nome, senha e email no corpo da requisição, conforme exemplo:

          {
              "name": "teste",
              "password": "111",
              "email": "email@email.com"
          }

- Rota para Login de Usuario:

  - Rota utilizada para o retorno do token de validação que será utilizado nas requisições de buscas e modificações:

          http://localhost:3333/login

  - Para realizar o login, deve ser informado o email e senha no corpo da requisção no formato JSON, conforme exemplo:

          {
              "email": "email@email.com",
              "password": "111"
          }

  - Após realizar o login, será retornado o token de acesso, conforme exemplo:

          {
              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE2ODY3MDIyLCJleHAiOjE2MTY5NTM0MjJ9.4EqhFkGymSWPHMmE2mHxEUyd3xbzsTioMm2bo52oico"
          }


