module.exports = function(players){
  return {
    beginRound: function(){
    }
    , endRound: function(){
    }
    , execute: function(player){

      if(player.health >= player.healthMax){
        console.log('* REST (ALREADY AT MAX HEALTH)');
      }else{
        console.log('* REST');
        player.heath++;
      }

    }
  };
};
