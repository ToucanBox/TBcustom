// arm constructor

// make arm canvas
// renderable to arm sprite
// swappable textures
// animated

var arm = function (route, cWidth, cHeight, boolean) {

  this.testCanvas = document.getElementById('test-canvas');

  this.armRenderer = new PIXI.CanvasRenderer(200, 80, {view:this.testCanvas, transparent:true, antialias: true});

  // Create render texture
  this.baseRenderTexture = new PIXI.BaseRenderTexture(this.armRenderer, this.armRenderer.width, this.armRenderer.height, PIXI.SCALE_MODES.LINEAR, 1);
  this.renderTexture = new PIXI.RenderTexture(this.baseRenderTexture);
  this.armCanvas = new PIXI.Container();
  this.armRenderer.render(this.armCanvas, this.renderTexture);
  // this.renderTexture = PIXI.RenderTexture.create(this.armRenderer, this.armRenderer.width, this.armRenderer.height);

  // Place base arm sprite
  this.armCanvas.pivot.x = this.armRenderer.width / 2;
  this.armCanvas.pivot.y = this.armRenderer.height / 2;
  this.armCanvas.position.x = this.armRenderer.width / 2 + 2;
  this.armCanvas.position.y = this.armRenderer.height / 2;

  this.armBase = new PIXI.Sprite.fromFrame('a1.png');
  this.armCanvas.addChild(this.armBase);

  // setup arm clothes sprites in advance - tweak positions for each TODO

  this.armPjs = new PIXI.Sprite.fromFrame('a3.png');
  this.armCanvas.addChild(this.armPjs);

  // test frame for canvas
  this.testFrame = new PIXI.Graphics();
  this.testFrame.lineStyle(1, 0xffd900, 1);
  this.armCanvas.addChild(this.testFrame);

  this.testFrame.moveTo(0,0);
  this.testFrame.lineTo(192, 0);
  this.testFrame.lineTo(192, 78);
  this.testFrame.lineTo(0, 78);
  this.testFrame.lineTo(0, 0);

  // Render to test canvas
  this.armRenderer.render(this.armCanvas);

  // Render to render texture
  this.armRenderer.render(this.armCanvas, this.renderTexture);

  // Create and add combined arm sprite to scene
  this.armSprite = new PIXI.Sprite(this.renderTexture);
  console.log('number of children of route: ' + route.children.length);
  route.addChild(this.armSprite);
  console.log('arm added');
  console.log('number of children of route: ' + route.children.length);
};


arm.prototype.update = function () {


  // arm animations loop TODO

  // arm canvas updates

  requestAnimationFrame(this.update.bind(this));

};


module.exports = arm;
