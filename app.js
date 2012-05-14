var players = require('./players');
var sandbox = require('./sandbox');
var actions = {
    attack: require('./actions/attack')(players)
  , rest: require('./actions/rest')(players)
};

players.forEach(function(player){
  player.tick = player.script.runInNewContext(sandbox());
});

var proxyWorld = function(){
  return {

    players: players.map(function(p){
      return {
          name: p.name
        , isAlive: p.health > 0
      };
    })

  };
};

for(var tick = 0; tick < 10; tick++){
  actions.attack.beginRound();
  actions.rest.beginRound();

  players.forEach(function(player){
    console.log('Player: %s, Turn: %d', player.name, tick + 1);
    if(player.health > 0){
      player.tick(proxyWorld(), function(action, target){
        var actionFunction = actions[action];
        if(!actionFunction)
          console.log('* UNKNOWN: %s %s', action, target);
        else
          actionFunction.execute(player, target);
      });
    }else{
      console.log('Dead men take no turns...');
    }
    console.log('----------------------------------------');
  });

  actions.rest.endRound();
  actions.attack.endRound();
}
