## Desafio 01 - Construindo com serverless - Ignite

### Start

```bash
yarn # install dependencies
```


```bash
yarn dynamodb:start # run the db 
```


```bash
yarn dev # start the app
```

### Routes

Ao rodar o `yarn dev`, será exibido no terminal as rotas geradas.


`POST - /todos/{userid}`

Essa rota deve receber o id de um usuário pelo pathParameters (você pode criar esse id manualmente apenas para preencher o campo) e os seguintes campos no corpo da requisição: title e deadline, onde deadline é a data limite para o todo.

O todo deverá ser salvo com os seguintes campos no DynamoDB:

**body**
```js
{ 
	"title" : "serverless challenge",
	"done": true,
	"deadline": "2022-04-08"
}
```

`GET - /todos/{userid}`

Essa rota deve receber o `id` de um usuário pelo pathParameters (o mesmo `id` que foi usado para criar algum todo).

A rota deve retornar os todos que possuírem o `user_id` igual ao `id` recebido pelos parâmetros.