var fs = require('fs')
  , vm = require('vm');

var Player = function(name){
  return {
      name: name.replace(/\.js$/, '')
    , script: vm.createScript(fs.readFileSync('./players/' + name))
    , health: 10
    , maxHealth: 10
  };
};

module.exports = players = [];
fs.readdirSync('./players').forEach(function(filename){
  players.push(new Player(filename));
});
