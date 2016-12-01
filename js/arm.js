// arm constructor


// swappable textures TODO

var arm = function () {

  this.armCanvas = new PIXI.Container();

  // Place base arm container
  this.armCanvas.pivot.x = 200 / 2;
  this.armCanvas.pivot.y = 80 / 2;
  this.armCanvas.position.x = 200 / 2 + 2;
  this.armCanvas.position.y = 80 / 2 + 2;

  this.armBase = new PIXI.Sprite.fromFrame('a1.png');
  this.armCanvas.addChild(this.armBase);

  // setup arm clothes sprites in advance - tweak positions for each TODO
  // add to stage depending on conditions

  // this.armPjs = new PIXI.Sprite.fromFrame('a3.png');
  // this.armCanvas.addChild(this.armPjs);

  // test frame for canvas
  this.testFrame = new PIXI.Graphics();
  this.testFrame.lineStyle(1, 0xffd900, 1);
  this.armCanvas.addChild(this.testFrame);

  this.testFrame.moveTo(0,0);
  this.testFrame.lineTo(192, 0);
  this.testFrame.lineTo(192, 78);
  this.testFrame.lineTo(0, 78);
  this.testFrame.lineTo(0, 0);


  // kick off update loop
  requestAnimationFrame(this.update.bind(this));

};


arm.prototype.update = function () {


  // NEEDED? TODO

  // arm canvas updates

  requestAnimationFrame(this.update.bind(this));

};

arm.prototype.changeArmClothes = function(id) {
  // expose arm clothes changing API TODO

};

arm.prototype.changeArmHand = function(id) {
  // expose arm hand flipping API TODO

};


module.exports = arm;
