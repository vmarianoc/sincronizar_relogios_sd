//const process_lib = require("process");
const relogio = require("./relogio");

let processo = {
	id: 0,
	relogio: relogio ,
	

	//FIXME: garantir que os ids não se repetirem entre os processos
	//possibilidade: multiplicar pelo pid? Lembrando que o pid será diferente em cada máquina, a não ser que consida de ser igual
	setarID: function () {
		this.id = 1 + Math.floor(Math.random() * 1000); 
	},

	getID: function () {
		return this.id;
	},

	imprimirID: function () {
		console.info("***************************");
		console.info(`ID do processo: ${this.id}`);
		//console.info("***************************");

	},
}

module.exports = processo;