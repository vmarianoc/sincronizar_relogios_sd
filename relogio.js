// Esse arquivo serve para definir o relógio 

var hora = 0;
var drift = 0;
var passo = 1;



let relogio = {

    incrementaHora: function(){
        setInterval(
            function(){
                hora += passo + drift;
            }
        ,1000
        );
    },

    aumentaDrift: function(){
        drift += 1;
        console.info(`O novo drift é de ${drift}`);
    },

    diminuiDrift: function(){
        drift -= 1;
        console.info(`O novo drift é de ${drift}`);
    },

    exibirHora: function(){
        console.info(`O passo do relógio é: ${passo}`);
        console.info(`Horário local: ${hora}`);
        return this.hora;
    },
    
    atualizandoHora: function(horaRec){
        hora = horaRec;
    },
    
};

module.exports = relogio;