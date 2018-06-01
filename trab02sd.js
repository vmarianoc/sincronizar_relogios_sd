const dgram = require("dgram");
const process = require("process");

const PORTA = 5555;
const ENDERECO_MULTICAST = "233.255.255.255";

const socket = dgram.createSocket({type: "udp4", reuseAddr: true});
socket.bind(PORTA);

var horaLocal = 0;
var incremento = Math.floor(Math.random() * 10);


//TODO: setar identificador do processo diferente do pid?

//enviando mensagens
socket.on("listening", function() {
	socket.addMembership(ENDERECO_MULTICAST);
	setInterval(enviarMensagem, 2000); //para teste
  setInterval(incrementarHoraLocal,1000);
	const endereco = socket.address();
	console.log(`Socket UDP escutando em ${endereco.address}:${endereco.port} pid: ${process.pid} `);
});


function enviarMensagem() {
	const mensagem = Buffer.from(`Mensagem do processo: ${process.pid}`);
	socket.send(mensagem,0,mensagem.length,PORTA,ENDERECO_MULTICAST,function() {
		console.info(`Enviando mensagem... "${mensagem}"`);
	});
}


//recebendo mensagens
socket.on("message", function(mensagem, informacao) {
	console.info(`Mensagem vinda de: ${informacao.address}:${informacao.port} ... ${mensagem}`);
});


//outras funções
function incrementarHoraLocal() {
 // console.info(`Valor de incremento: ${incremento}`);
  horaLocal +=  incremento;
  console.info(`Horário local: ${horaLocal}`)
}