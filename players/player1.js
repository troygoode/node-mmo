module.exports = function(world, cb){
  // targets random enemies (including self or dead enemies)
  var randomIndex = Math.floor(Math.random() * world.players.length);
  var target = world.players[randomIndex];
  cb('attack', target.name);
};
