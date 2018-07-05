# Sincronizar Relógios

Segundo trabalho para a disciplina de Sistemas Distribuídos que consiste na utilização dos algoritmos de Bully e Berckley para a sincronização de relógios em processos diferentes.

A aplicação foi feita em [NodeJS](https://nodejs.org/en/).

## Organização do Repositório
-O arquivo app.js é o arquivo que contém o código principal da aplicação. 
- O arquivo relogio.js contém o código referente as relógios da aplicação, como incremento de tempo.
- O arquivo multcast.js controla a lib do NodeJS responsável pelas mensagens em multcast
O arquivo processo.js é responsável pelas operações de identificação e instanciamento de processos.


## Implantação do Ambiente
Instalar o npm de acordo com as instruções do site da aplicação.

## Executando a Aplicação
Abra o terminal e execute:
  node app.js
  
  
Para executar os outros processos, é necessário abrir outros terminais e executar o mesmo comando.
