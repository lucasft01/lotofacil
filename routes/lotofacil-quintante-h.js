

exports.quintanteH = function(config) {

	this.quintanteH = function(_mapResult){
		for(var i in _mapResult){			
			for(var ii in _mapResult[i].orderBol){
				if(_mapResult[i].orderBol[ii] >= 1 && _mapResult[i].orderBol[ii] <= 5){
					config.client.incr('lotofacil-quintanteH-q-1');
				}else if(_mapResult[i].orderBol[ii] >= 6 && _mapResult[i].orderBol[ii] <= 10){
					config.client.incr('lotofacil-quintanteH-q-2');
				}else if(_mapResult[i].orderBol[ii] >= 11 && _mapResult[i].orderBol[ii] <= 15){
					config.client.incr('lotofacil-quintanteH-q-3');
				}else if(_mapResult[i].orderBol[ii] >= 16 && _mapResult[i].orderBol[ii] <= 20){
					config.client.incr('lotofacil-quintanteH-q-4');
				}else{
					config.client.incr('lotofacil-quintanteH-q-5');
				}
			}
		}		
	};


	this.cron = function() {
		var $this = this;
		new config.cron('*/1 * * * * *', function(){
		    config.client.lpop('lotofacil-fila-quintanteH', function(err, d) {
		    	if(err) console.err('[ERRO] ao ler a chave (lotofacil-fila-quintanteH) redis');
				if(d){
					var _objD = JSON.parse(d);					
					$this.quintanteH(_objD);
					console.log('consumindo fila (lotofacil-quintanteH) redis');					
				}
			});
		}, null, true, "");
	};

};