module.exports = function(world, cb){
  var self = this;
  var targets = world.players.filter(function(p){
    return p.alive && p.name != self.name;
  });
  var randomIndex = Math.floor(Math.random() * targets.length);
  cb('attack', targets[randomIndex].name);
};
