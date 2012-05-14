module.exports = function(world){
  var actions = {
      attack: require('./attack')(world)
    , rest: require('./rest')(world)
  };

  return {
    beginRound: function(){
      actions.attack.beginRound();
      actions.rest.beginRound();
    }
    , endRound: function(){
      actions.rest.endRound();
      actions.attack.endRound();
    }
    , execute: function(player, action, target){
      var f = actions[action];
      if(f && f.execute)
        f.execute(player, target);
      else
        console.log('* UNKNOWN: %s %s', action, target);
    }
  };
};
