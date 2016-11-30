// init

var PIXI = require('pixi.js');
var anime = require('animejs');
var body = require('/Users/anthonymoles/Documents/TBcustom/js/body.js');
var item = require('/Users/anthonymoles/Documents/TBcustom/js/item.js');
var arm = require('/Users/anthonymoles/Documents/TBcustom/js/arm.js');


var init = function () {

  // init
  this.canvas = document.getElementById('Pcanvas');
  this.renderer = PIXI.autoDetectRenderer(600, 720, { transparent: true, antialias: true });
  this.canvas.appendChild(this.renderer.view);
  this.renderer.view.setAttribute('class', 'canvas-class');

  // canvas dimensions
  this.cWidth = this.renderer.width;
  this.cHeight = this.renderer.height;

  // create the root of the scene graph
  this.stage = new PIXI.Container();

  // add centred viewport (just in case going forward)
  this.viewport = new PIXI.Container();
  this.viewport.pivot.x = this.cWidth/2;
  this.viewport.pivot.y = this.cHeight/2;
  this.viewport.position.x = this.cWidth/2;
  this.viewport.position.y = this.cHeight/2;
  this.stage.addChild(this.viewport);

  // add name container banner
  //

  // Route object for group animation
  this.route = new PIXI.Container();
  this.route.pivot.x = this.cWidth/2;
  this.route.pivot.y = this.cHeight;
  this.route.position.x = this.cWidth/2;
  this.route.position.y = this.cHeight - 20;
  this.route.skew.x = 0.1;
  this.route.rotation = 0.1;
  this.route.scale.y = 1.2;
  this.viewport.addChild(this.route);

  // list of all textures
  this.itemTextures = [];
  this.armsTextures = [];
  this.bodyTextures = [];

  // adding items to the scene (extend with clothes(also affects arm object - change arms method), hair and shoes (static, placed in lower layers))
  var self = this;

  this.onClick = function(event) {
    var id = event.target.id;
    console.log('clicked item ID: ' + id);
    var index = id - 1;

    var image = self.itemTextures[index];
    var routeContainer = self.route;
    var dragLayer = self.dragLayer;

    var add = new item(id, image, routeContainer, dragLayer);

    self.route.addChild(add);
  };

  // init first render cycle
  requestAnimationFrame(this.animate.bind(this));

};

init.prototype.loadTextures = function () {
  var i;

  for (i = 1; i <= 61; i++)
    {
       var texture = PIXI.Texture.fromFrame( i + '.png' );
       this.itemTextures.push(texture);
    }
};

init.prototype.populatePalette = function () {
  var i;

  var icons = document.getElementById('icons');

  for (i = 1; i <= 61; i++) {
    var node = document.createElement("li");
    node.className = 'js_slide sprite-icons icons-' + i;
    node.id = i;
    node.addEventListener( 'click' , this.onClick.bind(this) , false );
    icons.appendChild( node );
  }

};

init.prototype.initSlider = function () {

  var multiSlides = document.querySelector('.slider');

  // different behaviour on wider screens - scroll more slides. if/else statement
  lory(multiSlides, {
      infinite: 0,
      enableMouseEvents: true,
      slidesToScroll: 3,
      rewind: true
  });


};

init.prototype.makeTestFrame = function () {

  //TESTING frame

  this.graphics = new PIXI.Graphics();
  this.graphics.lineStyle(1, 0xffd900, 1);

  this.graphics.moveTo(0,0);
  this.graphics.lineTo(600, 0);
  this.graphics.lineTo(600, 720);
  this.graphics.lineTo(0, 720);
  this.graphics.lineTo(0, 0);

  this.viewport.addChild(this.graphics);

};

init.prototype.animate = function () {

  // ANIMATE

  // render the stage
  this.renderer.render(this.stage);

  // render loop
  requestAnimationFrame(this.animate.bind(this));
};

init.prototype.makeBody = function() {
  // construct base toucanoo
  var initBody = new body(this.route, this.cWidth, this.cHeight);

};

init.prototype.makeArms = function() {
  // construct toucanoo arms
  var initArm = new arm(this.route, this.cWidth, this.cHeight, true);

};

init.prototype.changeArms = function(id) {
  // change arms

};


module.exports = new init();
