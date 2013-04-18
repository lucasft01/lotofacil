
exports.frequenciadupla = function(config) {

	this.frequenciadupla = function(_mapResult){
		for(var i in _mapResult){
			var par = 0;
			var impar = 0;
			for(var ii in _mapResult[i].orderBol){
				
			}			
			for(var di = 0 ; di < 14 ; di++){
				for(var dii = 1 ; dii < 15 ; dii++){
					if(dii > di){						
						config.client.incr('lotofacil-frequenciadupla-'+_mapResult[i].orderBol[di]+'-'+_mapResult[i].orderBol[dii]);
					}
				}	
			}
		}			
	};


	this.cron = function() {
		var $this = this;
		new config.cron(config.cronTime, function(){
		    config.client.lpop('lotofacil-fila-frequenciadupla', function(err, d) {
		    	if(err) console.err('[ERRO] ao ler a chave (lotofacil-fila-frequenciadupla) redis');
				if(d){
					var _objD = JSON.parse(d);
					$this.frequenciadupla(_objD);
					console.log('consumindo fila (lotofacil-frequenciadupla) redis');					
				}
			});
		}, null, true, "");
	};

};