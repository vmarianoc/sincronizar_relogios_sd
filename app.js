const readline = require("readline");

const multicast = require("./multicast");

const processo = require("./processo");

function exibirMenu() {
	//console.info();
	console.info("***************************");
	console.info("Pressione 'ENTER' para começar o algoritmo de sincronização,");
	console.info("Pressione 't' para exibir o ID do relógio e o horário local,");
	console.info("Pressione 'm' ou 'h' para reproduzir este menu novamente,");
	console.info("Pressione qualquer tecla para sair da aplicação.");
	console.info("***************************");
	console.info();
}

function main() {

	//TODO: setar identificador do processo diferente do pid?

	//o relogio de cada processo será incrementado a cada 1s com um valor fixo. 
	//Esse valor é definido randomicamente no início da aplicação.
	processo.relogio.incrementarHoraLocal();
	processo.setarID();

	console.info("Olá, o que deseja fazer?");
	exibirMenu();



	readline.emitKeypressEvents(process.stdin);
	process.stdin.setRawMode(true);
	process.stdin.on('keypress', (str,tecla) => {
		if (tecla.name === 'm' || tecla.name === 'h') {
			exibirMenu();
		}
		else if (tecla.name === 't') {
			processo.imprimirID();
			processo.relogio.exibirHorarioLocal();


		}
		else if (tecla.name === 'return') {
			multicast.criarSocket();
			multicast.enviarMensagens();
			multicast.receberMensagens();
		}
		else {
			process.exit();
			//exit();
		}
	});
		
}


main();