var anime = require('animejs');

//body constructor

var body = function (route, bodyLayer, faceLayer, cWidth, cHeight) {

  //test circle to see base
  this.graphics = new PIXI.Graphics();
  this.graphics.beginFill(0xffd900);
  this.circle = new PIXI.Circle(cWidth/2, cHeight, 10);
  this.graphics.drawShape(this.circle);
  bodyLayer.addChild(this.graphics);

  this.cWidth = cWidth;

  // animation values
  this.animVal = {
    eyeScaleL: 0.95,
    eyeScaleR: 0.95,
    faceLookX: 0,
    faceLookY: 0,
    eyebrowY: cHeight / 2 - 70,
    eyebrowR: 0
  };

  faceLayer.position.x = this.animVal.faceLookX;
  faceLayer.position.y = this.animVal.faceLookY;

  // feet shadows
  this.shadow = new PIXI.Graphics();
  this.shadow.beginFill(0x413D3B);
  this.shadow.alpha = 0.2;
  this.circleL = new PIXI.Circle(cWidth/2 + 84, 2420, 56);
  this.circleR = new PIXI.Circle(cWidth/2 - 84, 2420, 56);
  this.shadow.drawShape(this.circleL);
  this.shadow.drawShape(this.circleR);
  this.shadow.scale.set(1, 0.3);
  bodyLayer.addChild(this.shadow);

  this.torso = new PIXI.Sprite.fromFrame('b2.png');
  this.torso.anchor.x = 0.5;
  this.torso.anchor.y = 0.5;
  this.torso.position.x = cWidth/2;
  this.torso.position.y = cHeight/2 + 100;
  bodyLayer.addChild(this.torso);

  // face

  this.eyeL = new PIXI.Sprite.fromFrame('b5.png');
  this.eyeR = new PIXI.Sprite.fromFrame('b5.png');
  this.eyeL.anchor.set(0.5, 0.5);
  this.eyeR.anchor.set(0.5, 0.5);
  this.eyeL.scale.x = 0.95;
  this.eyeL.scale.y = this.animVal.eyeScaleL;
  this.eyeL.scale.x = 0.95;
  this.eyeR.scale.y = this.animVal.eyeScaleR;
  faceLayer.addChild(this.eyeL);
  faceLayer.addChild(this.eyeR);
  this.eyeL.position.set(cWidth / 2 + 32, cHeight / 2 - 40);
  this.eyeR.position.set(cWidth / 2 -32, cHeight / 2 - 40);

  // smile eyes

  this.smileEyes = false;

  this.eyeSL = new PIXI.Sprite.fromFrame('b6.png');
  this.eyeSR = new PIXI.Sprite.fromFrame('b6.png');
  this.eyeSL.anchor.set(0.5, 0.5);
  this.eyeSR.anchor.set(0.5, 0.5);
  this.eyeSL.scale.set(0.95, 0.95);
  this.eyeSR.scale.set(0.95, 0.95);
  faceLayer.addChild(this.eyeSL);
  faceLayer.addChild(this.eyeSR);
  this.eyeSL.position.set(cWidth / 2 + 32, cHeight / 2 - 40);
  this.eyeSR.position.set(cWidth / 2 -32, cHeight / 2 - 40);
  this.eyeSL.alpha = 0;
  this.eyeSR.alpha = 0;

  // brows

  this.eyeBrowL = new PIXI.Sprite.fromFrame('b7.png');
  this.eyeBrowR = new PIXI.Sprite.fromFrame('b7.png');
  this.eyeBrowL.anchor.set(0.5, 0.5);
  this.eyeBrowL.scale.set(-1, 1);
  this.eyeBrowR.anchor.set(0.5, 0.5);
  faceLayer.addChild(this.eyeBrowL);
  faceLayer.addChild(this.eyeBrowR);
  this.eyeBrowL.position.set(cWidth / 2 + 33, this.animVal.eyebrowY);
  this.eyeBrowR.position.set(cWidth / 2 - 33, this.animVal.eyebrowY);

  this.mouthMain = new PIXI.Sprite.fromFrame('b8.png');
  this.mouthMain.anchor.set(0.5, 0.5);
  this.mouthMain.position.set(cWidth/2, cHeight / 2 + 10);
  faceLayer.addChild(this.mouthMain);
  this.mouthMain.alpha = 1;

  // swappable mouthes

  this.mouthSwapped = false;
  this.mouthOing = false;

  this.mouthO = new PIXI.Sprite.fromFrame('b5.png');
  this.mouthO.anchor.set(0.5, 0.5);
  this.mouthO.scale.set(0.75, 0.75);
  faceLayer.addChild(this.mouthO);
  this.mouthO.position.set(cWidth/2, cHeight / 2 + 10);
  this.mouthO.alpha = 0;

  this.mouthC = new PIXI.Sprite.fromFrame('b3.png');
  this.mouthC.anchor.set(0.5, 0.5);
  this.mouthC.scale.set(0.95, 0.95);
  faceLayer.addChild(this.mouthC);
  this.mouthC.position.set(cWidth/2, cHeight / 2 + 10);
  this.mouthC.alpha = 0;
};

body.prototype.doBlink = function () {

  var init = this;

  console.log(this.animVal.eyeScaleL);

  this.eyeBlink = anime({
  targets: this.animVal,
  eyeScaleL: 0.1,
  eyeScaleR: 0.1,
  faceLookX: 50,
  faceLookY: 10,
  eyebrowY: init.cHeight / 2 - 120, //init.cHeight / 2 - 70
  eyebrowR: 1,
  duration: 2000,
  autoplay: false,
  direction: 'alternate',
  loop: 1
});

console.log(this.animVal.eyeScaleL);

this.eyeBlink.play();

console.log('blink');
};

body.prototype.swapMouth = function () {
  var self = this;

  if (!this.mouthSwapped) {
    this.mouthC.alpha = 1;
    this.mouthMain.alpha = 0;
    this.mouthO.alpha = 0;
    this.mouthSwapped = true;
    setTimeout (function() { self.swapMouth(); }, 1500);
  } else {
    this.mouthC.alpha = 0;
    this.mouthMain.alpha = 1;
    this.mouthO.alpha = 0;
    this.mouthSwapped = false;
  }
};

body.prototype.oMouth = function () {
  var self = this;
  if (!this.mouthOing) {
    this.mouthC.alpha = 0;
    this.mouthMain.alpha = 0;
    this.mouthO.alpha = 1;
    this.mouthOing = true;
    setTimeout (function() { self.oMouth(); }, 1500);
  } else {
    this.mouthC.alpha = 0;
    this.mouthMain.alpha = 1;
    this.mouthO.alpha = 0;
    this.mouthOing = false;
  }
};

body.prototype.sEyes = function () {
  var self = this;
  if (!this.smileEyes) {
    this.eyeSL.alpha = 1;
    this.eyeSR.alpha = 1;
    this.eyeL.alpha = 0;
    this.eyeR.alpha = 0;
    this.smileEyes = true;
    setTimeout (function() { self.sEyes(); }, 2500);
  } else {
    this.eyeSL.alpha = 0;
    this.eyeSR.alpha = 0;
    this.eyeL.alpha = 1;
    this.eyeR.alpha = 1;
    this.smileEyes = false;
  }
};

module.exports = body;
