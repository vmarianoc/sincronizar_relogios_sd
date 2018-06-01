var horaLocal = 0;
var incremento = 1 + Math.floor(Math.random() * 100);  

module.exports = {

	incrementarHoraLocal: function () {
		setInterval(incrementar_HoraLocal,1000);

		
	},

	exibirHorarioLocal: function () {
	//	console.info();
		console.info("***************************");
		console.info(`Valor de incremento: ${incremento}`);
		console.info(`Horário local: ${horaLocal}`);
		console.info("***************************");
		console.info();
	

	},


};

var incrementar_HoraLocal = function () {
	 // console.info(`Valor de incremento: ${incremento}`);
		horaLocal +=  incremento;
}
