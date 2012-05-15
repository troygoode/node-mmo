var sandbox = require('./sandbox')
  , players = require('./players')
  , Rat = require('./monsters/rat');

players.forEach(function(player){
  player.tick = player.script.runInNewContext(sandbox());
  player.tick.bind(null);
});

// create 2 rats for every 1 player
var ratCount = players.length * 2;
for(var i = 0; i < ratCount; i++)
  players.push(new Rat('Rat' + i));

var world = module.exports = {
  players: players
};
