//Body.js

var body = function (viewport, cWidth, cHeight) {
  this.torso = new PIXI.Sprite.fromFrame('b2.png');
  this.torso.anchor.x = 0.5;
  this.torso.anchor.y = 0.5;
  this.torso.position.x = cWidth/2;
  this.torso.position.y = cHeight/2;
  viewport.addChild(this.torso);

};


body.prototype.animate = function () {


};

module.exports = body;
