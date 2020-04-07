//Este arquivo é responsável pela conexão

const processo = require("./processo");

//Conexão UDP, multicast
const dgram = require("dgram");
const porta = 5555;
const multicast1 = "224.0.0.0";

var relogios = [];
var lider = [];

var socket;

let multicast = {    

    //Função de criação do socket 
    setSocket: function(argument){
        console.info("Criando Socket");
        socket = dgram.createSocket({type:"udp4", reuseAddr: true});
        socket.bind(porta, () =>{
            socket.addMembership(multicast1);
        }) ;
        console.info("Socket feito");
    },

    //Função de Envio de Mensagem
    sendMessage: function(mensagem){
        socket.on("listening", function(){
            setInterval(enviaMensagem, 2000);
            const con = socket.address();
            console.log(`Socket em: ${con.address}:${con.port} \nID: ${processo.getID()}`);
        });
    },

    //Função de Recebimento de mensagem

    //Enviar e recebe um array com [func, id, hora, lider]
    receiveMessage: function(){
        socket.on("Message", function(mensagem){
            //mensagem 
            if(mensagem[0] == "IniciaBerkeley"){
                let envi = ["RespostaBerkeley", processo.getID(), processo.getHora(), "1"];
                enviaMensagem(envi);
             }
            else if(mensagem[0] == "RespostaBerkeley" && mensagem[3] == "1"){
                let envi = ["RespostaBerkeley", processo.getID(), processo.getHora(), "0"];
                enviaMensagem(envi);
            }
            else if(mensagem[0] == "RespostaBerkeley" && mensagem[3] == "0"){
                if (processo.getLider() == "1"){
                    alimentaArray(mensagem);
                    berkeley();
                }
            }
            else if(mensagem[0] == "RelogioNovo"){
                if(processo.getLider() == "1"){
                    addNewRelogio(mensagem);
                }
            }
            else if(mensagem[0] == "TEMPO-NOVO"){
                console.log(`Recebendo o ajuste de Berkeley`);
                processo.atualizandoHora(mensagem[2]);
            }
            else if(mensagem[0] == "LiderNovo"){
                if (mensagem[1] == processo.getID()){
                    console.log(`Esse é o novo Lider`);
                    processo.setLider();
                }
            }
            else if(mensagem[0] == "IniciaEleicao"){
                console.log(`Pedido de Eleição Iniciado`);
                //Se o PID for menor ele tem maior prioridade a se tornar o lider
                if (mensagem[1] > processo.getID()){
                    console.log(`Tem o PID Menor que o recebido\n`);
                    let resposta = ["RespostaEleicao", processo.getID(), processo.getHora(), 0];
                    enviaMensagem(resposta);
                }
                else{
                    console.log(`Não responde nada, ID maior.\n`);
                }
            }
            else if(mensagem[0] == "Resposta Eleição"){
                console.log(`Recebendo a resposta da Eleição`);
                
            }
        });
    },

    enviaID: function(){
        socket.on("listening", function(){
            socket.addMembership(multicast1);
            enviaMensagem(processo.getID());
        });

    },

};

//Função para envio de mensagem
var enviaMensagem = function(mensagem){
    const msg = Buffer.from(`${mensagem}`);
    socket.send(msg, 0, msg.length, porta, multicast1, function(){
        console.info(`Enviando\n "${msg}"`);
    });
    
};

//função para conferir o ID dos processos
var testaID = function(mensagem){

    var idRec = parseInt(mensagem);
    console.info(`ID Recebido ${idRec}`);

    if (processo.getID() != idRec){
        enviarMensagem("OK");
 
    }
};

var addNewRelogio = function(mensagem){
    relogios.push(mensagem);
};

//Função para atualizar os horários da matriz de todos os relógios
var alimentaArray = function(mensagem){
    for (var i = 0; i < relogios.length; i++){
        //se já tiver o id cadastrado do relógio atualiza o valor dele na matriz
        if ((mensagem[2] == relogios[i][2]) && mensagem[3] == "1"){
            for (var j = 0; j < mensagem.length; j++){
                relogios[i][j] = mensagem[j];
            }
        }  
        else if(mensagem[2] == relogios[i][2] && mensagem[3] == "0"){
            for (var j = 0; j < mensagem.length; j++){
                relogios[i][j] = mensagem[j];
                lider[j] = mensagem[j];
            }
        }
        else{
            console.log(`Não temos esse PID cadastrado`);
        }
    }
};

//Função de Berkeley, Calcula a média do tempo de uma matrix com todos os valores de hora, depois reenvia.
var berkeley = function(){
    console.log(`Começando a Calcular Berkeley\n`);
    var media;
    for (var i = 0; i < relogios.length; i++){
        media = (media + (lider[1] - relogios[i][1]))/2;
    }
    console.log(`A média foi ${media}`);
    var tnovo = [];
    tnovo[1] = lider[1] + media;
    tnovo[0] = "TEMPO-NOVO";
    enviaMensagem(tnovo);
}
 


// # receiving time from all slave nodes
// repeat_for_all_slaves:
//  time_at_slave_node = receive_time_at_slave()
//  # calculating time difference
//  time_difference = time_at_master_node - time_at_slave_node
// # average time difference calculation
// average_time_difference = sum(all_time_differences) / number_of_slaves
//ok
// synchronized_time = current_master_time + average_time_difference
// # broadcasting synchronized to whole network
// broadcast_time_to_all_slaves(synchronized_time)
//If failure of master, elect a new master
module.exports = multicast;