var LEVEL_THRESHOLDS = [50,100,200,500,1000,1500,2500,4000]
  , HEALTH_INDEX = [100,110,125,145,170,195,225,260]
  , STRENGTH_INDEX = [20,22,25,29,34,40,47,55]
  , DEFENSE_INDEX = [20,22,24,26,28,30,32,34];

var Player = module.exports = function(name, script){
  this.type = 'player';
  this.name = name;
  this.script = script;
  this.health = this.maxHealth = HEALTH_INDEX[0];
  this.alive = true;
  this.strength = STRENGTH_INDEX[0];
  this.defense = DEFENSE_INDEX[0];
  this.xp = 0;
  this.level = 0;
};

Player.prototype.attack = function(target){
  if(!this.alive || !target)
    return;

  var damage = this.strength - target.defense/2;
  if(damage < 1)
    damage = 1;
  target.takeDamage(damage);
};

Player.prototype.takeDamage = function(damage){
  if(!this.alive || damage < 0)
    return;

  this.health -= damage > this.health
    ? this.health
    : damage;
  if(this.health <= 0)
    this.alive = false;
};

Player.prototype.rest = function(){
  if(!this.alive)
    return;

  this.health += 10;
};

Player.prototype.gainXp = function(xp){
  if(!this.alive || xp < 0)
    return;

  this.xp += xp;
  if(this.xp >= LEVEL_THRESHOLDS[this.level]){
    console.log('^ %s levelled up!', this.name);
    this.level++;
    if(STRENGTH_INDEX[this.level])
      this.strength = STRENGTH_INDEX[this.level];
    if(DEFENSE_INDEX[this.level])
      this.defense = DEFENSE_INDEX[this.level];
    if(HEALTH_INDEX[this.level])
      this.maxHealth = HEALTH_INDEX[this.level];
  }
};
