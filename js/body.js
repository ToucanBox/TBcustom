//body constructor

var body = function (route, cWidth, cHeight) {

  //test circle to see base
  this.graphics = new PIXI.Graphics();
  this.graphics.beginFill(0xffd900);
  this.circle = new PIXI.Circle(cWidth/2, cHeight, 10);
  this.graphics.drawShape(this.circle);
  route.addChild(this.graphics);

  this.torso = new PIXI.Sprite.fromFrame('b2.png');
  this.torso.anchor.x = 0.5;
  this.torso.anchor.y = 0.5;
  this.torso.position.x = cWidth/2;
  this.torso.position.y = cHeight/2 + 100;
  route.addChild(this.torso);

  // face TODO

};


body.prototype.animate = function () {

  // face animations TODO

};

module.exports = body;
