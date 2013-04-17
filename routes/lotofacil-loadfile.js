var $ = require('jquery');

exports.loadFile = function(config) {

	this.carregar = function(data){
		var rows = $(data).find('table').find('tr');	
		var mapResult = [];
		for(var i = 0 ; i < rows.length ; i++){
			var obj = {};
			obj.conc = $($(rows[i]).find('td')[0]).text();
			obj.data = $($(rows[i]).find('td')[1]).text();
			obj.b1   = $($(rows[i]).find('td')[2]).text();
			obj.b2   = $($(rows[i]).find('td')[3]).text();
			obj.b3   = $($(rows[i]).find('td')[4]).text();
			obj.b4   = $($(rows[i]).find('td')[5]).text();
			obj.b5   = $($(rows[i]).find('td')[6]).text();
			obj.b6   = $($(rows[i]).find('td')[7]).text();
			obj.b7   = $($(rows[i]).find('td')[8]).text();
			obj.b8   = $($(rows[i]).find('td')[9]).text();
			obj.b9   = $($(rows[i]).find('td')[10]).text();
			obj.b10  = $($(rows[i]).find('td')[11]).text();
			obj.b11  = $($(rows[i]).find('td')[12]).text();
			obj.b12  = $($(rows[i]).find('td')[13]).text();
			obj.b13  = $($(rows[i]).find('td')[14]).text();
			obj.b14  = $($(rows[i]).find('td')[15]).text();
			obj.b15  = $($(rows[i]).find('td')[16]).text();
			obj.arrec= $($(rows[i]).find('td')[17]).text();

			obj.gan15= $($(rows[i]).find('td')[18]).text();
			obj.gan14= $($(rows[i]).find('td')[19]).text();
			obj.val15= $($(rows[i]).find('td')[23]).text();
			obj.val14= $($(rows[i]).find('td')[24]).text();

			var orderBol = [obj.b1, obj.b2, obj.b3, obj.b4, obj.b5, obj.b6, obj.b7, obj.b8, obj.b9, obj.b10, obj.b11, obj.b12, obj.b13, obj.b14, obj.b15];
			orderBol.sort();
			
			obj.orderBol = orderBol;		

			obj.ob1   = orderBol[0];
			obj.ob2   = orderBol[1];
			obj.ob3   = orderBol[2];
			obj.ob4   = orderBol[3];
			obj.ob5   = orderBol[4];
			obj.ob6   = orderBol[5];
			obj.ob7   = orderBol[6];
			obj.ob8   = orderBol[7];
			obj.ob9   = orderBol[8];
			obj.ob10  = orderBol[9];
			obj.ob11  = orderBol[10];
			obj.ob12  = orderBol[11];
			obj.ob13  = orderBol[12];
			obj.ob14  = orderBol[13];
			obj.ob15  = orderBol[14];		
			
			mapResult.push(obj);		
		}

		//lança objeto na file lotofacil-fila-repeat do redis	
		config.client.lpush('lotofacil-fila-repeat', JSON.stringify(mapResult));
		config.client.lpush('lotofacil-fila-frequencia', JSON.stringify(mapResult));
		return mapResult;
	};
};