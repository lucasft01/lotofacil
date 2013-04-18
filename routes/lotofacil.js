
var fs = require('fs');
var repeat = require('./lotofacil-repeat.js').repeat;
var loadfile = require('./lotofacil-loadfile.js').loadFile;
var frequencia = require('./lotofacil-frequencia.js').frequencia;
var parimpar = require('./lotofacil-parimpar.js').parimpar;

var redis = require("redis"),
    client = redis.createClient(),
    cron = require("cron").CronJob;
/*
 * Serve JSON to our AngularJS client
 */
var lotofacil = {};
var config = {};
config.client = client;
config.cron = cron;

var _objRepeat = new repeat(config);
var _objLoadfile = new loadfile(config);
var _objFrequencia = new frequencia(config);
var _objParimpar = new parimpar(config);

//inicia escuta de fila redis
_objRepeat.cron();
_objFrequencia.cron();
_objParimpar.cron();

exports.readFSLotoFacil = function (req, res) { 
	//_objLoadfile.downloadFile();
	var data = fs.readFileSync('lotofacil/D_LOTFAC.HTM');		
	res.json(_objLoadfile.carregar(data.toString()));
};
