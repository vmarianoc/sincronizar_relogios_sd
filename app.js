const relogio = require("./relogio");


function main() {
	

	//TODO: setar identificador do processo diferente do pid?
	console.info("Holla, que tal?");
	relogio.incrementarHoraLocal(1000);	
}


main();