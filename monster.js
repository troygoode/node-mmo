var Monster = module.exports = function(){
  this.type = 'monster';
  this.alive = true;
};

Monster.prototype.tick = function(world, cb){
  //noop
};

Monster.prototype.attack = function(target){
  if(!this.alive || !target)
    return;

  var damage = this.strength - target.defense/2;
  if(damage < 1)
    damage = 1;
  target.takeDamage(damage);
};

Monster.prototype.takeDamage = function(damage){
  if(!this.alive || damage < 0)
    return;

  this.health -= damage > this.health
    ? this.health
    : damage;
  if(this.health <= 0)
    this.alive = false;
};

Monster.prototype.rest = function(){
  if(!this.alive)
    return;

  this.health += 10;
  if(this.health > this.maxHealth)
    this.health = this.maxHealth;
};

Monster.prototype.gainXp = function(xp){
  //noop
};
