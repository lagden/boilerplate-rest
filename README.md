# Boilerplate Rest

[![Build Status][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]

[ci-img]: https://github.com/lagden/boilerplate-rest/actions/workflows/nodejs.yml/badge.svg
[ci]: https://github.com/lagden/boilerplate-rest/actions/workflows/nodejs.yml
[coveralls-img]: https://coveralls.io/repos/github/lagden/boilerplate-rest/badge.svg?branch=main
[coveralls]: https://coveralls.io/github/lagden/boilerplate-rest?branch=main

Boilerplate para desenvolvimento de uma aplicação.

- [Instalação](#instalação)
- [Como utilizar](#como-utilizar)
  - [watch](#watch)
  - [teste](#teste)
- [Imagem](#imagem)
- [Deploy](#deploy)
- [Exemplo](#exemplo)
- [Middlewares](#middlewares)
- [License](#license)

## Instalação

Utilize `@tadashi/boilerplate-create` para iniciar o projeto.

```
npm i -g @tadashi/boilerplate-create
boilerplate-create
```

ou

```
npx --yes @tadashi/boilerplate-create
```

E siga as instruções do prompt.

## Como utilizar

Após finalizado o `scaffolding` do projeto, instale os pacotes.

```shell
bin/node/pkg.js
bin/node/zera
```

Feito isso, o projeto está pronto para funcionar.

Para rodar **local**, utilize:

```shell
bin/local/start
```

E via **docker**, utilize:

```shell
bin/docker/start
```

> [!IMPORTANT]  
> No **docker**, caso seja instalado um novo pacote, é necessário fazer o `build` da imagem novamente.  
> Pare o container (`bin/docker/stop` ou `control + c`) e rode novamente passando o parâmetro `-b`:

```shell
bin/docker/start -b
```

### watch

O **watch** reinicia a aplicação caso ocorra alguma alteração.  
Rodando via **docker** isso ocorre por padrão, mas **local** é necessário fazer algumas instalações e configurações.

```shell
bin/local/start
```

### teste

Para executar os testes.

**local:**

```shell
bin/local/test
```

**docker:**

```shell
bin/docker/test
```

## Imagem

Crie os arquivos de usuário e senha do **registry** que serão utilizados para fazer o `push` da imagem.

```shell
echo 'username' > .registry-user
echo 'password' > .registry-passwd
```

> [!IMPORTANT]  
> Verifique as suas variáveis de ambiente `.conf/*.sh`.

E para fazer o `push` da imagem de sua aplicação, execute:

```shell
bin/docker/image -e production
```

## Deploy

Para executar o **deploy** é necessário alguns binários instalados:

- **envsubst** by Bruno Haible
- **rsync** by Andrew Tridgell, Wayne Davison and others

O fluxo do sistema de **deploy** é simples:

1. Carrega as variáveis de ambiente (`staging` ou `production`)
2. Executa o script `bin/docker/image` (se passado o parâmetro `-i` esse processo é ignorado)
3. Cria o arquivo `docker-compose-{VERSION}.yml` utilizando o **envsubst**
4. Envia os arquivos para o servidor via **rsync**
5. Executa o `docker stack deploy` no servidor

```shell
bin/docker/deploy -e production
```

## Exemplo

Chamada de exemplo da API via **curl**.

```shell
curl 'http://127.0.0.1:5001/'
```

```shell
curl 'http://127.0.0.1:5001/API'
```

```shell
curl 'http://127.0.0.1:5001/echo' \
-H 'content-type: application/json' \
-d '{"apenas": "um show"}'
```

## Middlewares

Sugestão de outros **middlewares** para serem utilizados no projeto:

- [koa-helmet](https://github.com/venables/koa-helmet)
- [@koa/multer](https://github.com/koajs/multer)
- [koa-ctx-cache-control](https://github.com/koajs/ctx-cache-control)
- [koa-ratelimit](https://github.com/koajs/ratelimit)
- [koa-static](https://github.com/koajs/static)

## Buy me a coffee

BTC: bc1q7famhuj5f25n6qvlm3sssnymk2qpxrfwpyq7g4

## License

MIT © [Thiago Lagden](https://github.com/lagden)
