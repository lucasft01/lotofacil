

exports.quintanteV = function(config) {

	this.quintanteV = function(_mapResult){
		for(var i in _mapResult){			
			for(var ii in _mapResult[i].orderBol){
				if(_mapResult[i].orderBol[ii] == 1 || _mapResult[i].orderBol[ii] == 6 || _mapResult[i].orderBol[ii] == 11 || _mapResult[i].orderBol[ii] == 16 || _mapResult[i].orderBol[ii] == 21){
					config.client.incr('lotofacil-quintanteV-q-1');
				}else if(_mapResult[i].orderBol[ii] == 2 || _mapResult[i].orderBol[ii] == 7 || _mapResult[i].orderBol[ii] == 12 || _mapResult[i].orderBol[ii] == 17 || _mapResult[i].orderBol[ii] == 22){
					config.client.incr('lotofacil-quintanteV-q-2');
				}else if(_mapResult[i].orderBol[ii] == 3 || _mapResult[i].orderBol[ii] == 8 || _mapResult[i].orderBol[ii] == 13 || _mapResult[i].orderBol[ii] == 18 || _mapResult[i].orderBol[ii] == 23){
					config.client.incr('lotofacil-quintanteV-q-3');
				}else if(_mapResult[i].orderBol[ii] == 4 || _mapResult[i].orderBol[ii] == 9 || _mapResult[i].orderBol[ii] == 14 || _mapResult[i].orderBol[ii] == 19 || _mapResult[i].orderBol[ii] == 24){
					config.client.incr('lotofacil-quintanteV-q-4');
				}else{
					config.client.incr('lotofacil-quintanteV-q-5');
				}
			}
		}		
	};


	this.cron = function() {
		var $this = this;
		new config.cron(config.cronTime, function(){
		    config.client.lpop('lotofacil-fila-quintanteV', function(err, d) {
		    	if(err) console.err('[ERRO] ao ler a chave (lotofacil-fila-quintanteV) redis');
				if(d){
					var time = new Date().getTime();
					var _objD = JSON.parse(d);					
					console.log('consumindo fila (lotofacil-quintanteV) redis');
					$this.quintanteV(_objD);
					console.log('(lotofacil-quintanteV) processado em .......... '+(new Date().getTime()-time)/1000+'s');
				}
			});
		}, null, true, "");
	};

};