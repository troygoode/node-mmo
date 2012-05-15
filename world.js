var sandbox = require('./sandbox')
  , Rat = require('./monsters/rat');

var world = module.exports = {
  players: require('./players')
};

world.players.forEach(function(player){
  player.tick = player.script.runInNewContext(sandbox());
});

// create 2 rats for every 1 player
var ratCount = world.players.length * 2;
for(var i = 0; i < ratCount; i++)
  world.players.push(new Rat('Rat' + i));

