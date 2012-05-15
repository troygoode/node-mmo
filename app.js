var _ = require('underscore')
  , world = require('./world')
  , actions = require('./actions')(world)
  , ROUNDS = 50;

var proxyWorld = function(){
  return {
    players: world.players.map(function(p){
      return {
          type: p.type
        , name: p.name
        , alive: p.health > 0
        , level: p.level ? p.level : 0
      };
    })
  };
};

for(var round = 0; round < ROUNDS; round++){
  // end the game if only one player is left
  var players = world.players.filter(function(p){ return p.alive; });
  if(players.length === 1){
    console.log('WINNER: %s', players[0].name);
    break;
  }

  // shuffle the order of players
  players = _.shuffle(players);

  // begin the round
  console.log('ROUND %d', round + 1);
  actions.beginRound();

  // give each player their turn
  players.forEach(function(player){
    console.log('----------------------------------------\n%s: %s (%d/%d)', player.type, player.name, player.health, player.maxHealth);
    player.tick(proxyWorld(), function(action, target){
      actions.execute(player, action, target);
    });
  });

  // end the round
  actions.endRound();
  console.log('========================================');
}
