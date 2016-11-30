// arm constructor

// make arm canvas
// renderable to arm sprite
// swappable textures
// animated

var arm = function (viewport, cWidth, cHeight, boolean) {

  this.testCanvas = document.getElementById('test-canvas');

  this.armRenderer = PIXI.autoDetectRenderer(196, 72, {view:this.testCanvas, transparent:true, antialias: true});

  // Place base arm sprite
  this.armCanvas = new PIXI.Container();
  this.armBase = new PIXI.Sprite.fromFrame('a1.png');

  // Create render texture
  // this.baseRenderTexture = new PIXI.BaseRenderTexture(this.armRenderer, 196, 72, PIXI.SCALE_MODES.LINEAR, 1);
  // this.renderTexture = new PIXI.RenderTexture(this.baseRenderTexture);
  this.renderTexture = PIXI.RenderTexture.create(this.armRenderer, this.armRenderer.width, this.armRenderer.height);
};


arm.prototype.update = function () {
  // Render to test canvas
  this.armRenderer.render(this.armCanvas);

  // Render to render texture
  this.armRenderer.render(this.armCanvas, this.renderTexture);

  requestAnimationFrame(this.update.bind(this));

};

arm.prototype.firstArm = function (viewport) {

  this.armCanvas.addChild(this.armBase);

  // Create and add combined arm sprite to scene
  this.armSprite = new PIXI.Sprite(this.renderTexture);
  console.log('number of children of viewport: ' + viewport.children.length);
  viewport.addChild(this.armSprite);
  console.log('arm added');
  console.log('number of children of viewport: ' + viewport.children.length);

};

module.exports = arm;
