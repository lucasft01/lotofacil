
exports.parimpar = function(config) {

	this.parimpar = function(_mapResult){
		for(var i in _mapResult){
			var par = 0;
			var impar = 0;
			for(var ii in _mapResult[i].orderBol){
				if((_mapResult[i].orderBol[ii]%2) == 0){
					par++;
				}else{
					impar++;
				}
			}
			config.client.zincrby('lotofacil-parimpar-p', 1, 'lotofacil-parimpar-p'+par+'-i'+impar);
		}		
	};


	this.cron = function() {
		var $this = this;
		new config.cron(config.cronTime, function(){
		    config.client.lpop('lotofacil-fila-parimpar', function(err, d) {
		    	if(err) console.err('[ERRO] ao ler a chave (lotofacil-fila-parimpar) redis');
				if(d){
					config.client.get(d, function (err, reply) {
						var time = new Date().getTime();
						var _objD = JSON.parse(reply.toString());					
						console.log('consumindo fila (lotofacil-parimpar) redis');
						$this.parimpar(_objD);
						console.log('(lotofacil-parimpar) processado em .......... '+(new Date().getTime()-time)/1000+'s');
					});
				}
			});
		}, null, true, "");
	};

};