# Front end

## Clonar repositório

Para clonar o repositório na sua máquina com git, rode o seguinte comando:

```
git clone https://github.com/josebruno2020/developer-front.git
```

## Configuração do docker

Para configurar o ambiente docker na sua máquina rode o comando na pasta do projeto:

```
cp .env.example .env && docker-compose build && docker-compose up -d
```

Este passo pode demorar um pouquinho até que tudo seja configurado.

OBS: por padrão estou usando a porta `8080` para o vue. Certifique-se que esteja livre ou mude no arquivo `docker-compose.yml`

## OBS - Backend

No arquivo `.env.example` estou apontando para a api na porta `4000`, caso você tenha mudado, não se esqueça de mudar aqui também, para que tudo funcione corretamente.
