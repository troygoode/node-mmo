var _ = require('underscore')
  , world = require('./world')
  , actions = require('./actions')(world)
  , ROUNDS = 50
  , DEBUG = false;

var proxyWorld = function(){
  return {
    players: world.players.map(function(p){
      return {
          name: p.name
        , isAlive: p.health > 0
      };
    })
  };
};

for(var round = 0; round < ROUNDS; round++){
  // end the game if only one player is left
  var players = world.players.filter(function(p){ return p.alive; });
  if(players.length === 1){
    console.log('WINNER: %s', players[0].name);
    console.log('========================================');
    console.log(world);
    break;
  }

  // shuffle the order of players
  players = _.shuffle(players);

  // begin the round
  console.log('ROUND %d', round);
  actions.beginRound();

  // give each player their turn
  players.forEach(function(player){
    console.log('----------------------------------------\nPlayer: %s', player.name);
    player.tick(proxyWorld(), function(action, target){
      actions.execute(player, action, target);
    });
  });

  // end the round
  actions.endRound();
  console.log('========================================');

  // !!! debug
  if(DEBUG){
    console.log(world);
    console.log('========================================');
  }
}
