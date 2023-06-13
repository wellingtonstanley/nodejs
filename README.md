DESCRICAO

Aplicacao foi construida para seguir o padrao MVC, dividido entre:
controllers: pasta que guarda o arquivo hackController.js que responsavel por
receber requisicoes, controlar regras e retornar a resposta;
model: pasta que armazena a parte relacionada ao modelo de dados. Nela há o
arquivo produto.js, responsavel por efetuar o calculo das simulacoes.
routes: pasta que tem o arquivo hackRoute. Ele redireciona as chamadas para as rotas.

Arquivos de configuracao:
dbSqlConfig.js: efetua a conexao com o banco de dados
send.js: efetua a conexao e envio de eventos

Para rodar o projeto é necessario ter o Node instalado e o npm.
Execute o comando npm install para obter as dependencias
Vá na pasta raiz, no mesmo nível do arquivo server.js e execute o comando: npm run dev
Após a aplicação rodar será possível efetuar requisicoes. Foram criadas, inicialmente, duas:
1: GET: http://localhost:8080/produto/v1/stanley/:valor
Rota de teste caso queira ver o valor consultado do banco de dados

2: POST http://localhost:8080/produto/v1/stanley/
Rota para o endpoint de simulacao que recebe o valor desejado e o prazo, retornando duas simulacoes,
uma SAC e outra PRICE. Em seguida envia para o eventHUB;

O arquivo .env tem algumas configuracoes que podem ser alteradas como desejar.
