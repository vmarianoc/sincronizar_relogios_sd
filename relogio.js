var horaLocal = 0;
var incremento = 1 + Math.floor(Math.random() * 100);  

module.exports = {

	incrementarHoraLocal: function (intervaloDeTempo) {
		setInterval(incrementarHoraLocal,1000);

		
	},


};

var incrementarHoraLocal = function () {
	 // console.info(`Valor de incremento: ${incremento}`);
		horaLocal +=  incremento;
		console.info(`Horário local: ${horaLocal}`)
}
