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

### Instalando dependências

O package manager escolhido para utilização neste projeto foi o Yarn, para incluir suas dependências, pode-se utilizar o comando:

    yarn install /* ou apenas yarn */

### Rodando o server

Para executar a aplicação, é necessário subir o container com o banco de de dados e rodar as migrações do `sequelize`, conforme descrito abaixo:

#### Subindo o container

    sudo docker-compose up -d ou docker-compose up -d

#### Executando as migrações

    yarn migration:up ou npm run migration:up

#### Executando a aplicação

    yarn dev

ou

npm run dev

## Funcionalidades

A aplicação foi desenvolvida utilizando o padrão REST, abaixo serão listadas as rotas disponibilizadas pela aplicação:

### Autenticação

- Rota de cadastro de Usuário:

  Rota utilizada para cadastrar um novo usuário:

          http://localhost:3333/singup

  Para cadastrar um usuário, deve ser informado o nome, senha e e-mail no corpo da requisição, conforme exemplo:

  ```json
  {
    "name": "teste",
    "password": "111",
    "email": "email@email.com"
  }
  ```

- Rota para Login de Usuário:

  Rota utilizada para o retorno do código de autorização que será utilizado nas requisições de buscas e modificações:

          http://localhost:3333/login

  Para realizar o login, deve ser informado o email e senha no corpo da requisção no formato JSON, conforme exemplo:

  ```json
  {
    "email": "email@email.com",
    "password": "111"
  }
  ```

  Após realizar o login, será retornado o token de acesso, conforme exemplo:

  ```json
  {
    "token": "<código de token>"
  }
  ```

---

## Funcionalidades protegidas

### Rotas de projetos

Base da url (`{base}`): `https://localhost:3333/projetos`

#### Criar novo projeto:

Realizando um `POST` para a rota `{base}` irá executar a criação de um novo projeto na base de dados.

```json
{
	"name": "<nome do projeto>",
	"navers"?: [
		<ids dos navers>
	]
}
```

#### Buscando projeto por identificador

Realizando um `GET` para a rota `{base}/:id` irá executar a busca por ID de projeto, retornando um único projeto da base de dados.

```json
{
  "id": 1,
  "name": "teste",
  "navers": [
    {
      "id": 8,
      "birthdate": "1997-01-20",
      "admission_date": "2020-02-22",
      "name": "fulano,o clicano",
      "job_role": "desenvolvedor pleno"
    }
  ]
}
```

#### Listando projetos

Realizando um `GET` para a rota `{base}` irá executar a busca por todos os projetos indexados no banco.

Pode-se utilizar os seguintes filtros de query opcionais na requisição: `?name={valor desejado}` (Obs: remover `{}`).

```json
[
  {
    "id": 11,
    "name": "teste"
  },
  {
    "id": 15,
    "name": "teste2"
  },
  {
    "id": 16,
    "name": "teste3"
  },
  {
    "id": 18,
    "name": "Projetasso"
  }
]
```

#### Deletar projeto

`DELETE - {base}/:id` - o projeto de `:id` será deletado. Tenha em mente que não será possível reverter.

#### Alterar projeto

Realizando um `PATCH - {base}` ira atualizar o projeto, é importante sempre informar no corpo da requisição o `id` do projeto e os dados que devem ser atualizados, no caso de projetos é possivel atualizar o nome e os navers.

## Rotas de navers

Base da url (`{base}`): `https://localhost:3333/navers`

#### Criar novo naver:

Realizando um `POST` para a rota `{base}` irá executar a criação de um novo naver na base de dados.

```json
{
	"name":"<nome do naver>",
	"birthdate":"<data de nascimento>",
	"admission_date":"<data de admissão>",
	"job_role":"<cargo>",
    "projects"?:[
        <id dos projetos>
    ]
}
```

#### Buscando naver por identificador

Realizando um `GET` para a rota `{base}/:id` irá executar a busca por ID de naver, retornando um único naver da base de dados.

```json
{
  "id": 5,
  "name": "teste",
  "birthdate": "1997-01-20",
  "admission_date": "2020-02-22",
  "job_role": "teste",
  "projects": [
    {
      "id": 8,
      "name": "teste"
    },
    {
      "id": 9,
      "name": "teste"
    }
  ]
}
```

#### Listando Navers

Realizando um `GET` para a rota `{base}` irá executar a busca por todos os projetos indexados no banco.

Pode-se utilizar os seguintes filtros de query opcionais na requisição: `?name={valor desejado}, ?companyTime={valor desejado}, ?jobRole={valor desejado}` (Obs: remover `{}`).

```json
[
  {
    "birthdate": "1997-01-20",
    "admission_date": "2020-02-22",
    "id": 5,
    "name": "teste",
    "job_role": "teste"
  },
  {
    "birthdate": "1997-01-20",
    "admission_date": "2020-02-22",
    "id": 6,
    "name": "teste",
    "job_role": "teste"
  },
  {
    "birthdate": "1997-01-20",
    "admission_date": "2020-02-22",
    "id": 8,
    "name": "fulano,o clicano",
    "job_role": "desenvolvedor pleno"
  }
]
```

#### Deletar naver

`DELETE - {base}/:id` - o naver de `:id` será deletado. Tenha em mente que não será possível reverter.

#### Alterar naver

Realizando um `PATCH - {base}` ira atualizar o naver, é importante sempre informar no corpo da requisição o `id` do naver e os dados que devem ser atualizados, no caso dos navers é possivel atualizar o nome,
o aniversário, a data de admissão, o cargo e os projetos.

## Arquivos para testes no Postman

#### Importante
- [Postman](https://www.postman.com/downloads/)

Os arquivos json para testes no `Postman` estão disponiveis na pasta `Doc` do projeto. Aperte CRTL+O para importar os arquivos no seu aplicativo. 

Sao dois aquivos:
 - `Navedex-api Enviroment.postman_environment.json` - Arquivo com as variaveis de ambiente. (Depois de importado, deve ser selecionado como enviroment)
 - `Navedex-API.postman_collection.json` - Arquivo com as rotas e exemplos de requisições.





