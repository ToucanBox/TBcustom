//body constructor

var body = function (bodyLayer, faceLayer, cWidth, cHeight) {

  //test circle to see base
  this.graphics = new PIXI.Graphics();
  this.graphics.beginFill(0xffd900);
  this.circle = new PIXI.Circle(cWidth/2, cHeight, 10);
  this.graphics.drawShape(this.circle);
  bodyLayer.addChild(this.graphics);

  this.torso = new PIXI.Sprite.fromFrame('b2.png');
  this.torso.anchor.x = 0.5;
  this.torso.anchor.y = 0.5;
  this.torso.position.x = cWidth/2;
  this.torso.position.y = cHeight/2 + 100;
  bodyLayer.addChild(this.torso);

  // feet shadows TODO

  // face TODO

  // this.eyes = new PIXI.Graphics();
  // this.eyes.beginFill(0x413D3B);
  // this.circleL = new PIXI.Circle(100, -80, 50);
  // this.circleR = new PIXI.Circle(-100, -80, 50);
  // this.eyes.drawShape(this.circleL);
  // this.eyes.drawShape(this.circleR);
  // this.eyes.scale.set(0.2, 0.2);
  // faceLayer.addChild(this.eyes);

  this.eyeL = new PIXI.Sprite.fromFrame('b5.png');
  this.eyeR = new PIXI.Sprite.fromFrame('b5.png');
  this.eyeL.anchor.set(0.5, 0.5);
  this.eyeR.anchor.set(0.5, 0.5);
  this.eyeL.scale.set(0.95, 0.95);
  this.eyeR.scale.set(0.95, 0.95);
  faceLayer.addChild(this.eyeL);
  faceLayer.addChild(this.eyeR);
  this.eyeL.position.set(32, -40);
  this.eyeR.position.set(-32, -40);

  this.eyeBrowL = new PIXI.Sprite.fromFrame('b7.png');
  this.eyeBrowR = new PIXI.Sprite.fromFrame('b7.png');
  this.eyeBrowL.anchor.set(0.5, 0.5);
  this.eyeBrowL.scale.set(-1, 1);
  this.eyeBrowR.anchor.set(0.5, 0.5);
  faceLayer.addChild(this.eyeBrowL);
  faceLayer.addChild(this.eyeBrowR);
  this.eyeBrowL.position.set(33, -70);
  this.eyeBrowR.position.set(-33, -70);

  this.mouthMain = new PIXI.Sprite.fromFrame('b8.png');
  this.mouthMain.anchor.set(0.5, 0.5);
  this.mouthMain.position.set(0, 10);
  faceLayer.addChild(this.mouthMain);



  // support
};

body.prototype.startAnimate = function () {
  // init first update cycle
  requestAnimationFrame(this.animate.bind(this));
  console.log('face anim started');
};



body.prototype.animate = function () {

  // face animations TODO

  requestAnimationFrame(this.animate.bind(this));

};

module.exports = body;
