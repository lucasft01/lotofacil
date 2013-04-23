
exports.frequenciatripla = function(config) {

	this.frequenciatripla = function(_mapResult){
		for(var i in _mapResult){
			var par = 0;
			var impar = 0;
			for(var ii in _mapResult[i].orderBol){
				
			}
			
			for(var di = 0 ; di < 14 ; di++){
				for(var dii = 1 ; dii < 15 ; dii++){
					for(var diii = 2 ; diii < 15 ; diii++){
						if(dii > di && diii > dii){
							config.client.zincrby('lotofacil-frequenciatripla', 1, 'lotofacil-frequenciatripla-'+_mapResult[i].orderBol[di]+'-'+_mapResult[i].orderBol[dii]+'-'+_mapResult[i].orderBol[diii]);
						}
					}
				}	
			}			
		}			
	};


	this.cron = function() {
		var $this = this;
		new config.cron(config.cronTime, function(){
		    config.client.lpop('lotofacil-fila-frequenciatripla', function(err, d) {
		    	if(err) console.err('[ERRO] ao ler a chave (lotofacil-fila-frequenciatripla) redis');
				if(d){
					config.client.get(d, function (err, reply) {
						var time = new Date().getTime();
						var _objD = JSON.parse(reply.toString());
						console.log('consumindo fila (lotofacil-frequenciatripla) redis');
						$this.frequenciatripla(_objD);
						console.log('(lotofacil-frequenciatripla) processado em .......... '+(new Date().getTime()-time)/1000+'s');
					});	
				}
			});
		}, null, true, "");
	};

};