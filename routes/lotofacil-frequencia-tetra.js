
exports.frequenciatetra = function(config) {

	this.frequenciatetra = function(_mapResult){
		for(var i in _mapResult){
			var par = 0;
			var impar = 0;
			for(var ii in _mapResult[i].orderBol){
				
			}
			
			for(var di = 0 ; di < 14 ; di++){
				for(var dii = 1 ; dii < 15 ; dii++){
					for(var diii = 2 ; diii < 15 ; diii++){
						for(var diiii = 3 ; diiii < 15 ; diiii++){
							if(dii > di && diii > dii && diiii > diii){
								config.client.incr('lotofacil-frequenciatetra-'+_mapResult[i].orderBol[di]+'-'+_mapResult[i].orderBol[dii]+'-'+_mapResult[i].orderBol[diii]+'-'+_mapResult[i].orderBol[diiii]);
							}
						}
					}
				}	
			}			
		}			
	};


	this.cron = function() {
		var $this = this;
		new config.cron(config.cronTime, function(){
		    config.client.lpop('lotofacil-fila-frequenciatetra', function(err, d) {
		    	if(err) console.err('[ERRO] ao ler a chave (lotofacil-fila-frequenciatetra) redis');
				if(d){
					var time = new Date().getTime();
					var _objD = JSON.parse(d);
					console.log('consumindo fila (lotofacil-frequenciatetra) redis');
					$this.frequenciatetra(_objD);
					console.log('(lotofacil-frequenciatetra) processado em .......... '+(new Date().getTime()-time)/1000+'s');
				}
			});
		}, null, true, "");
	};

};