

exports.frequencia = function(config) {

	this.frequencia = function(_mapResult){
		for(var i in _mapResult){			
			console.log(_mapResult[i]);
			for(var ii in _mapResult[i].orderBol){
				config.client.incr('lotofacil-frequencia-n'+_mapResult[i].orderBol[ii]);
			}
		}		
	};


	this.cron = function() {
		var $this = this;
		new config.cron('*/1 * * * * *', function(){
		    config.client.lpop('lotofacil-fila-frequencia', function(err, d) {
		    	if(err) console.err('[ERRO] ao ler a chave (lotofacil-fila-frequencia) redis');
				if(d){
					var _objD = JSON.parse(d);					
					$this.frequencia(_objD);
					console.log('consumindo fila (lotofacil-frequencia) redis');					
				}
			});
		}, null, true, "");
	};

};