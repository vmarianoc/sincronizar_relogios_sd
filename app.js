const multicast = require("./muticast");
const processo = require("./processo");

//Import necessário para leitura
const readline = require("readline");

function Menu(){
    console.info("\n\nAperte Enter - Para começar a sincronização\n");
    console.info("Aperte A - Para aumentar o Drift\n");
    console.info("Aperte D - Para diminuir o Drift\n");
    console.info("Aperte H - Para o ID e o Horário\n");
    console.info("Aperte M - Exibir o Menu\n");
    console.info("Aperte C - Criar novo Processo\n");
    console.info("Aperte qualquer tecla - Para sair da aplicação.\n\n");
}

function main(){
    console.info("Bem vindo ao Sincroniza Relógio")
    //Começa o primeiro relógio
    processo.relogio.incrementaHora();
    processo.setID(1);
    var indice = 2;
    Menu();

    //Leitura teclado
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (str, opcao) => {
        if(opcao.name === 'm'){
            Menu();
        }
        else if (opcao.name === 'h'){
            processo.getID();
            processo.relogio.exibirHora();
        }
        else if (opcao.name === 'a'){
            processo.relogio.aumentaDrift();
        }
        else if (opcao.name === 'd'){
            processo.relogio.diminuiDrift();
        }
        else if (opcao.name === 'c'){
            processo.relogio.diminuiDrift();
        }
        else if (opcao.name === 'return'){
            multicast.setSocket();
            multicast.enviaID();
            multicast.receiveMessage();
        }
        else{
            process.exit();
        }
    });
    
}

main();