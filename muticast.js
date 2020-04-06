//Este arquivo é responsável pela conexão

const processo = require("./processo");

//Conexão UDP, multicast
const dgram = require("dgram");
const porta = 5555;
const multicast = "224.0.0.0";

var relogios = [];
var lider = [];

var socket;

let conexao = {    

    //Função de criação do socket 
    setSocket: function(argument){
        console.info("Criando Socket");
        socket = dgram.createSocket({type:"udp4", reuseAddr: true});
        socket.bind(porta, () =>{
            socket.addMembership(multicast);
        }) ;
        console.info("Socket feito");
    },

    //Função de Envio de Mensagem
    sendMessage: function(){
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
            if(mensagem[0] == "Hora"){
                for (var i = 0; i < relogios.length; i++){
                    //se já tiver o id cadastrado do relógio atualiza o valor dele na matriz
                    if ((mensagem[2] == relogios[i][2]) && ){
                        for (var j = 0; j < mensagem.length; j++){
                            relogios[i][j] = mensagem[j];
                        }
                    }  
                    else if(mensagem[2] == relogios[i][2]){

                    }
                    else{
                        for (var j = 0; j < mensagem.length; j++){
                            relogios[relogios.length][j] = mensagem[j];
                        } 
                    }
                } 
                    relogios[relogios.length].push(mensagem);
            }
        });
    },

    enviaID: function(){
        socket.on("listening", function(){
            socket.addMembership(multicast);
            enviaMensagem(processo.getID());
        });

    },

};

//Função para envio de mensagem
var enviaMensagem = function(mensagem){
    const msg = Buffer.from(`${mensagem}`);
    socket.send(msg, 0, msg.length, porta, multicast, function(){
        console.info(`Enviando\n "${msg}"`);
    });
    
}

//função para conferir o ID dos processos
var testaID = function(mensagem){

    var idRec = parseInt(mensagem);
    console.info(`ID Recebido ${idRec}`);

    if (processo.getID() != idRec){
        enviarMensagem("OK");
 
    }
}

var berkeley = function(){
    var media;
    for (var i = 0; i < relogios.length; i++){
        
    }
}

// # receiving time from all slave nodes
// repeat_for_all_slaves:
//  time_at_slave_node = receive_time_at_slave()
//  # calculating time difference
//  time_difference = time_at_master_node - time_at_slave_node

// # average time difference calculation
// average_time_difference = sum(all_time_differences) / number_of_slaves

// synchronized_time = current_master_time + average_time_difference

// # broadcasting synchronized to whole network
// broadcast_time_to_all_slaves(synchronized_time)

module.exports = conexao;