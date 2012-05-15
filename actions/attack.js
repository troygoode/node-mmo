var _ = require('underscore')
  , attacks = null;

module.exports = function(world){
  return {
    beginRound: function(){
      attacks = [];
    }

    , endRound: function(){
      // sort attacks by # of attackers (larger groups go first)
      _.sortBy(attacks, function(attack){ return attack.attackers.length })
       .reverse()
       .forEach(function(attack){

        // find target
        var target = _.find(world.players, function(p){ return p.name === attack.target });
        if(!target.alive)
          return;

        // give each attacker a chance to attack
        attack.attackers.forEach(function(attacker){
          if(attacker.alive)
            attacker.attack(target);
        });

        // if the target died, reward each attacker
        if(!target.alive){
          console.log('! %s has been killed.', target.name);
          var xp = target.maxHealth / attack.attackers.length;
          attack.attackers.forEach(function(attacker){
            if(attacker.alive)
              attacker.gainXp(xp);
          });
        }

      });
    }

    , execute: function(player, target){

      var targettedPlayer = _.find(world.players, function(p){ return p.name === target });
      if(!targettedPlayer){
        console.log('* ATTACK %s (NO SUCH PLAYER)', target);
      }else if(targettedPlayer.health <= 0){
        console.log('* ATTACK %s (ALREADY DEAD)', targettedPlayer.name);
      }else{
        console.log('* ATTACK %s', targettedPlayer.name);
        var attack = _.find(attacks, function(a){ return a.target === targettedPlayer.name });
        if(!attack){
          attacks.push({
              target: targettedPlayer.name
            , attackers: [player]
          });
        }else{
          attack.attackers.push(player);
        }
      }

    }
  }
};
