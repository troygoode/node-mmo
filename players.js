var fs = require('fs')
  , vm = require('vm')
  , Player = require('./player');

var players = module.exports = [];

fs.readdirSync('./players').forEach(function(filename){
  var script = vm.createScript(fs.readFileSync('./players/' + filename));
  players.push(new Player(filename.replace(/\.js$/, ''), script));
});
