var sandbox = require('./sandbox');

var world = module.exports = {
  players: require('./players')
};

world.players.forEach(function(player){
  player.tick = player.script.runInNewContext(sandbox());
});
