var fs = require('fs');
var http = require('http');
var url = require('url');

exports.download = function() {
	this.file_url = 'http://www1.caixa.gov.br/loterias/_arquivos/loterias/D_lotfac.zip';
	this.file = fs.createWriteStream("LOTOFACIL.zip");

	this.options = {
	    host: url.parse(this.file_url).host,
	    port: 80,
	    path: url.parse(this.file_url).pathname
	};

	this.go = function() {
		var $this = this;
		http.get(this.options, function(res) {
		    res.on('data', function(chunk) {
				$this.file.write(chunk);        
		    });
		});
	};	

};

