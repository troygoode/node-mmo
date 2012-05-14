var _ = require('underscore');

module.exports = function(players){
  return {
    beginRound: function(){
    }
    , endRound: function(){
    }
    , execute: function(player, target){

      var targettedPlayer = _.find(players, function(p){ return p.name === target });
      if(!targettedPlayer){
        console.log('* ATTACK %s (NO SUCH PLAYER)', target);
      }else if(targettedPlayer.health <= 0){
        console.log('* ATTACK %s (ALREADY DEAD)', targettedPlayer.name);
      }else{
        targettedPlayer.health--;
        console.log('* ATTACK %s', targettedPlayer.name);
        console.log(targettedPlayer);
        if(targettedPlayer.health <= 0)
          console.log('You killed \'em!');
      }

    }
  }
};
