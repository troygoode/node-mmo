module.exports = function(players){
  var resters = null;

  return {
    beginRound: function(){
      resters = [];
    }

    , endRound: function(){
      resters.forEach(function(p){
        if(p.alive)
          p.rest();
      });
    }

    , execute: function(player){

      if(player.health >= player.healthMax){
        console.log('* REST (ALREADY AT MAX HEALTH)');
      }else{
        console.log('* REST');
        resters.push[player];
      }

    }
  };
};
