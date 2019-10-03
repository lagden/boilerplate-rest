# API Boilerplate

[![XO code style][xo-img]][xo]

[xo-img]:        https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo]:            https://github.com/sindresorhus/xo


Boilerplate para desenvolvimento rápido de uma API REST


## Usage

Para criar a API:

```
npx degit lagden/api-boilerplate minha_api
```


## Comece

Existem 2 maneiras de trabalhar:

- Docker
- Local


### Docker

Cadastre a chave e crie os arquivos de usuário e senha do `registry`...

```
cd minha_api
echo 'chave secreta' | base64 | docker secret create api_rest_key -
echo 'username' > .registry-user
echo 'password' > .registry-passwd
```

...então inicie:

```
bin/start -bd
```

Sobre os parâmetros:

 - `-b` Efetua o build da imagem (só é necessário passar houver alteração nos pacotes)
 - `-d` Roda em background


Acesse seu endpoint: [http://[::1]:31000](http://[::1]:31000).  
É possível acompanhar os logs:

```
bin/logs
```

Para testar sua API:

```
bin/test
```


### Local

Instale as dependências...

```
cd minha_api
npm i
```

...então inicie:

```
env DEBUG_PREFIX=api_rest DEBUG=api_rest:* SECRET_KEY='chave secreta' npm start
```

Acesse seu endpoint: [http://[::1]:3000](http://[::1]:3000)


Para testar sua API:

```
npm test
```


## License

MIT © [Thiago Lagden](https://github.com/lagden)
