// arm constructor

var arm = function () {

  this.armCanvas = new PIXI.Container();
  this.armCanvas.scale.x = -1;

  this.flipToggle = false;

  // Place base arm container
  this.armCanvas.pivot.x = 200 / 2;
  this.armCanvas.pivot.y = 80 / 2;
  this.armCanvas.position.x = 200 / 2 - 2;
  this.armCanvas.position.y = 80 / 2 + 2;

  this.toucanooLayer = new PIXI.Container();
  this.armCanvas.addChild(this.toucanooLayer);

  this.clothesLayer = new PIXI.Container();
  this.armCanvas.addChild(this.clothesLayer);

  this.armBase = new PIXI.Sprite.fromFrame('a1.png');
  this.toucanooLayer.addChild(this.armBase);

  this.armFlip = new PIXI.Sprite.fromFrame('a2.png');

  this.armTshirt = new PIXI.Sprite.fromFrame('a3.png');
  this.armTshirt.position.set(-3,3);

  this.armJumper = new PIXI.Sprite.fromFrame('a4.png');
  this.armJumper.position.set(4,0);

  this.armPjs = new PIXI.Sprite.fromFrame('a5.png');
  this.armPjs.position.set(0,-1);


  // arm mask
  this.mask = new PIXI.Graphics();
  this.mask.lineStyle(1, 0xffd900, 1);
  this.mask.beginFill(0x8bc5ff, 0.4);
  this.mask.moveTo(200,80);
  this.mask.lineTo(70, 80);
  this.mask.lineTo(70, 0);
  this.mask.lineTo(200, 0);
  this.mask.lineTo(200, 80);

  // test frame for canvas
  // this.testFrame = new PIXI.Graphics();
  // this.testFrame.lineStyle(1, 0xffd900, 1);
  // this.armCanvas.addChild(this.testFrame);
  //
  // this.testFrame.moveTo(0,0);
  // this.testFrame.lineTo(192, 0);
  // this.testFrame.lineTo(192, 78);
  // this.testFrame.lineTo(0, 78);
  // this.testFrame.lineTo(0, 0);

};

arm.prototype.removeAllClothes = function() {
  for (var i = this.clothesLayer.children.length - 1; i >= 0; i--) {
      this.clothesLayer.removeChild(this.clothesLayer.children[i]);
  }
  this.armBase.mask = null;
  this.armFlip.mask = null;
};

arm.prototype.removeClothesChange = function() {
  for (var i = this.clothesLayer.children.length - 1; i >= 0; i--) {
      this.clothesLayer.removeChild(this.clothesLayer.children[i]);
  }
};

arm.prototype.changeArmClothes = function(id) {
  // expose arm clothes changing API
  console.log('CHANGING ARMS CLOTHES');
  if (id === '40') {
    // PJs
    this.removeClothesChange();
    this.clothesLayer.addChild(this.armPjs);
    this.armBase.mask = this.mask;
    this.armFlip.mask = this.mask;

  } else if (id === '7') {
    // Jumper
    this.removeClothesChange();
    this.clothesLayer.addChild(this.armJumper);
    this.armBase.mask = this.mask;
    this.armFlip.mask = this.mask;

  } else if (id === '32') {
    // T-shirt
    this.removeClothesChange();
    this.clothesLayer.addChild(this.armTshirt);
    this.armBase.mask = this.mask;
    this.armFlip.mask = this.mask;

  } else if (id === '5') {
    this.removeClothesChange();
    this.armBase.mask = null;
    this.armFlip.mask = null;
  } else if (id === '45') {
    this.removeClothesChange();
    this.armBase.mask = null;
    this.armFlip.mask = null;
  } else {
    this.removeClothesChange();
    this.armBase.mask = null;
    this.armFlip.mask = null;
  }

};

arm.prototype.toggleArmHand = function() {
  // expose arm hand flipping API for animations
  if (!this.flipToggle) {
    this.toucanooLayer.addChild(this.armFlip);
    this.toucanooLayer.removeChild(this.armBase);
    this.flipToggle = true;
  } else {
    this.toucanooLayer.removeChild(this.armFlip);
    this.toucanooLayer.addChild(this.armBase);
    this.flipToggle = false;
  }
};

module.exports = arm;
