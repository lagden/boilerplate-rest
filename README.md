# API Boilerplate

[![XO code style][xo-img]][xo]

[xo-img]:        https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo]:            https://github.com/sindresorhus/xo


Boilerplate para desenvolvimento rápido de uma API REST


## Como usar

Para criar a API:

```shell
npx degit lagden/api-boilerplate minha_api
```


## Comece

Existem 2 maneiras de trabalhar:

- [Docker](#docker)
- [Local](#local)


### Docker

Entre no diretório do projeto:

```shell
cd minha_api
```

...então faça os seguintes passos:


#### Passo 1 (opcional)

Cadastre a chave e crie os arquivos de usuário e senha do `registry`...

**Atenção**

A chave só funciona com `Docker Swarm`.  
Quando sua API for para produção, o `secret` terá que ser criado no `Docker Host`


```shell
echo 'chave secreta' | base64 | docker secret create api_rest_key -
echo 'username' > .registry-user
echo 'password' > .registry-passwd
```


#### Passo 2

Inicie a aplicação:

```shell
bin/start -bd
```

Sobre os parâmetros:

 - `-b` Efetua o build da imagem (é necessário passar quando houver alteração nos pacotes)
 - `-d` Roda em background


Acesse seu endpoint: [http://[::1]:31000/](http://[::1]:31000/).  
É possível acompanhar os logs:

```shell
bin/logs
```

Para testar sua API:

```shell
bin/test -b
```


### Local

Instale as dependências...

```shell
cd minha_api
npm i
```

...então inicie:

```shell
env DEBUG_PREFIX=api_rest DEBUG=api_rest:\* SECRET_KEY='chave secreta' npm start
```

Acesse seu endpoint: [http://[::1]:3000/](http://[::1]:3000/)


Para testar sua API:

```shell
npm test
```


## cURL

Chamadas de exemplo via Docker:

```shell
curl 'http://[::1]:31000/'
```

```shell
curl 'http://[::1]:31000/login' \
-H 'content-type: application/json' \
-d '{"username": "user", "password": "passwd"}'
```

```shell
curl 'http://[::1]:31000/user' \
-H 'content-type: application/json' \
-H 'authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJKb2huIn0sImp0aSI6IjVkOWExYjBkNmU1OGUxYTQ1YjQ3MTZlZSIsImF1ZCI6Imh0dHA6Ly9bOjoxXSIsImlhdCI6MTU3MDM4MDU1NywibmJmIjoxNTcwMzgwNTU3fQ.wE11wXEdCrvep61aC8sylUIyvfXDeTOLx0r_OUNxfZAq27vluRXOw4pqUtZf5eWM5Xb9OTcyA7XGbtKMX14dHw'
```


## Extra

Se quiser utilizar uma biblioteca de autenticação JWT mais complexa, recomendo:

- [koa-jwt](https://github.com/koajs/jwt)

E com `koa-jwt` dá para utilizar:

- [jwks-rsa](https://github.com/auth0/node-jwks-rsa)
- [@tadashi/koa-jwt-authz](https://github.com/lagden/koa-jwt-authz)


### Outros middlewares

- [koa-helmet](https://github.com/venables/koa-helmet)
- [@koa/multer](https://github.com/koajs/multer)
- [koa-ctx-cache-control](https://github.com/koajs/ctx-cache-control)
- [koa-ratelimit](https://github.com/koajs/ratelimit)
- [koa-static](https://github.com/koajs/static)
- ...

## License

MIT © [Thiago Lagden](https://github.com/lagden)
