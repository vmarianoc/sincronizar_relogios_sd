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
    var processos = [];
    console.info("Bem vindo ao Sincroniza Relógio")
    //Começa o primeiro relógio
    //var j = processo;
   // j.relogio.incrementaHora();
    //j.setID(indice-1);
    //processos.push(j);
    //var indice = 2;
    processo.relogio.incrementaHora();
    processo.setID(1);
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
        
        // else if (opcao.name === 'h'){
        //         console.log(`${id}`);
        //         console.log(`${hor}`);       
        // }
        // else if (opcao.name === 'a'){
        //     for (p in processos){ 
        //         p.relogio.aumentaDrift();
        //     }
        // }
        // else if (opcao.name === 'd'){
        //     for (p in processos){
        //         p.relogio.diminuiDrift();
        //     }
        // }
        // else if (opcao.name === 'c'){
        //     let k = processos.relogio.incrementaHora();
        //     k.setID(indice);
        //     indice += 1;
        //     processos.push(k);
        // }
        else if (opcao.name === 'return'){
            multicast.setSocket();
            console.log(`Começando o Berkeley`);
            var berk = ["IniciaBerkeley", processo.getID(), processo.getHora(), "1"];
            multicast.sendMessage(berk);
            
        }
        else{
            process.exit();
        }
    });
    
}

main();