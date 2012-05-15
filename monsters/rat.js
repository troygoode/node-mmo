var Monster = require('../monster');

var Rat = module.exports = function(name){
  this.type = 'monster-rat';
  this.name = name;
  this.health = this.maxHealth = 10;
  this.strength = 2;
  this.defense = 2;
};

Rat.prototype = new Monster();
Rat.prototype.constructor = Rat;

Rat.prototype.tick = function(world, cb){
  var self = this;
  var targets = world.players.filter(function(p){
    return p.alive && p.name != self.name;
  });
  var randomIndex = Math.floor(Math.random() * targets.length);
  cb('attack', targets[randomIndex].name);
};
