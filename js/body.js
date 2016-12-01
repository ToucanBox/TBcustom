//body constructor

var body = function (layer, cWidth, cHeight) {

  //test circle to see base
  this.graphics = new PIXI.Graphics();
  this.graphics.beginFill(0xffd900);
  this.circle = new PIXI.Circle(cWidth/2, cHeight, 10);
  this.graphics.drawShape(this.circle);
  layer.addChild(this.graphics);

  this.torso = new PIXI.Sprite.fromFrame('b2.png');
  this.torso.anchor.x = 0.5;
  this.torso.anchor.y = 0.5;
  this.torso.position.x = cWidth/2;
  this.torso.position.y = cHeight/2 + 100;
  layer.addChild(this.torso);

  // feet shadows TODO

  // face TODO
  // faceLayer in init

};

body.prototype.startAnimate = function () {
  // init first render cycle
  requestAnimationFrame(this.animate.bind(this));
  console.log('face anim started');
};



body.prototype.animate = function () {

  // face animations TODO

  requestAnimationFrame(this.animate.bind(this));

};

module.exports = body;
