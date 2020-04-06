const dgram = require("dgram");
//const process = require("process");
const processo = require("./processo");

const PORTA = 5555;
const ENDERECO_MULTICAST = "233.255.255.255";


var socket;

module.exports = {

	criarSocket: function (argument) {
		socket = dgram.createSocket({type: "udp4", reuseAddr: true});
		socket.bind(PORTA);
		console.info("Socket criado!!!");
	},

	//enviando mensagens
	enviarMensagens: function () {
		socket.on("listening", function() {
			socket.addMembership(ENDERECO_MULTICAST);
			setInterval(criarMensagemResposta, 2000); //para teste
			const endereco = socket.address();
			console.log(`Socket UDP escutando em ${endereco.address}:${endereco.port} pid: ${processo.getID()} `);
		});
	},

	//recebendo mensagens
	/*receberMensagens: function (mensagem, informacao) {
		socket.on("message", function(mensagem, informacao) {
			console.info(`Mensagem vinda de: ${informacao.address}:${informacao.port} ... ${mensagem}`);
		});
	},*/

	enviarID: function() {
		//console.info("AAAAAAAAAAAAAAAAAAAAAAAAA");
		socket.on("listening", function() {
			socket.addMembership(ENDERECO_MULTICAST);
			//setInterval(criarMensagemResposta, 2000); //para teste
			criarMensagemResposta(processo.getID());
			const endereco = socket.address();
		//	console.log(`Socket UDP escutando em ${endereco.address}:${endereco.port} ID: ${processo.getID()} `);
		});
	},

	receberMensagens: function () {
		//return "TO BE IMPLEMENTED.";
		//console.info("AAAAAAAAAAAAAAAAAAAAAAAAA");
		socket.on("message", function(mensagem) {
		//	console.info("BBBBBBBB");
			if(mensagem != "OK") {
				compararID(mensagem);
			}

		});
	},


};


var compararID = function (mensagem) {
	var idRecebido = parseInt(mensagem);
	console.info(`Meu ID: ${processo.getID()}`);
	console.info(`ID recebido: ${idRecebido}`);

	//se o meu ID for maior que o recebido, responder com OK
	if (processo.getID() > idRecebido) {
		criarMensagemResposta("OK");
	}
}

var criarMensagemResposta = function (dado) {
	const mensagem = Buffer.from(`${dado}`);
	socket.send(mensagem,0,mensagem.length,PORTA,ENDERECO_MULTICAST,function() {
		console.info(`Enviando mensagem... "${mensagem}"`);
	});
}
/*
var responderComOK = function () {
	const ok = Buffer.from("OK");
	socket.send(ok,0,ok.length,PORTA,ENDERECO_MULTICAST,function() {
		console.info(`Enviando mensagem... "${ok}"`);
	});
}
*/

//TODO: Apagar essa função
/*var criarMensagemResposta = function () {
	const mensagem = Buffer.from(`Mensagem do processo: ${processo.getID()}`);
	socket.send(mensagem,0,mensagem.length,PORTA,ENDERECO_MULTICAST,function() {
		console.info(`Enviando mensagem... "${mensagem}"`);
	});
}
*/
