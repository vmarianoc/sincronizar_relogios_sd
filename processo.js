//Essa função está responsável por cada processo
const relogio = require("./relogio");


let processo ={
    id: 0,
    lider: 0,
    relogio: relogio,

    getID: function(){
        return this.id;
    },

    //ID deve ser diferente de cada processo
    setID: function(){
        this.id = 1 + Math.floor(Math.random()* 100)
    },

    printID: function(){
        console.info(`ID: ${this.id}`);
    },

    setLider: function(){
        lider = 1;
    },

    getLider: function(){
        return this.lider;
    },

}

module.exports = processo;