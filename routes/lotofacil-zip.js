var AdmZip = require('adm-zip');
var fs = require('fs');

exports.zip = function() {
	this.nameOutputfile = "D_LOTFAC.HTM";
	this.zip = new AdmZip("./LOTOFACIL.zip");
	this.zipEntries = zip.getEntries(); 

	this.go = function() {
		this.zipEntries.forEach(function(zipEntry) {	   
			if (zipEntry.entryName == this.nameOutputfile) {
			     console.log(zipEntry.getData().toString()); 
			     fs.writeFileSync(this.nameOutputfile, zipEntry.getData().toString());
			}
		});
	};

};
