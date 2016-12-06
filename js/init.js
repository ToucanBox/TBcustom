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

  // arm renderTexture
  this.brt = new PIXI.BaseRenderTexture(200, 80, PIXI.SCALE_MODES.LINEAR, 1);
  this.rt = new PIXI.RenderTexture(this.brt);

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

  // Route object for group animation
  this.route = new PIXI.Container();
  this.route.pivot.x = this.cWidth/2;
  this.route.pivot.y = this.cHeight;
  this.route.position.x = this.cWidth/2;
  this.route.position.y = this.cHeight - 40;
  this.route.skew.x = 0;
  this.route.rotation = 0;
  this.route.scale.y = 1;
  this.viewport.addChild(this.route);

  // Cape layer
  this.cape = new PIXI.Sprite.fromFrame('39.png');
  this.cape.anchor.set(0.5, 0.5);
  this.cape.alpha = 0;
  this.route.addChild(this.cape);
  this.cape.position.set(300, 520);


  // Body layer
  this.bodyLayer = new PIXI.Container();
  this.route.addChild(this.bodyLayer);

  // Clothes layer
  this.clothesLayer = new PIXI.Container();
  this.route.addChild(this.clothesLayer);

  // Arms layer
  this.armLayer = new PIXI.Container();
  this.route.addChild(this.armLayer);

  // Accessories layer
  this.accessoriesLayer = new PIXI.Container();
  this.route.addChild(this.accessoriesLayer);

  // Face layer
  this.faceLayer = new PIXI.Container();
  this.route.addChild(this.faceLayer);
  this.faceLayer.position.set(this.cWidth/2, this.cHeight/2);

  // list of all textures
  this.itemTextures = [];

  // arm points
  this.points = [];
  this.ropeLength = 200/19;


  // animation count
  this.count = 0;

  // adding items to the scene (extend with clothes(also affects arm object - change arms method), hair and shoes (static, placed in lower layers)) TODO
  var self = this;

  this.onClick = function(event) {
    var viewport = self.viewport;
    var id = event.target.id.toString();
    console.log('clicked item ID: ' + id);
    var index = id - 1;
    var image = self.itemTextures[index];
    var type;
    var add;

    // Type logic

    if ( id === '40' || id === '32' || id === '7' ) {
        // CLOTHES
        console.log('clothes');
        type = 'Clothes';
        add = new item(id, image, type, viewport);
        self.removeChildType(self.clothesLayer, 'Clothes');
        self.removeChildType(self.accessoriesLayer, 'Clothes');
        self.clothesLayer.addChild(add);
        this.changeArms(id);
      }

      else if ( id === '5' || id === '45' ) {
        // CLOTHES 2
        console.log('clothes v2');
        type = 'Clothes';
        add = new item(id, image, type, viewport);
        self.removeChildType(self.accessoriesLayer, 'Clothes');
        self.removeChildType(self.clothesLayer, 'Clothes');
        self.accessoriesLayer.addChild(add);
        this.changeArms(id);
      }

      else if ( id === '1' || id === '8' || id === '18' || id === '22' || id === '29' || id === '37' || id === '46' || id === '52' ) {
        // HAIR
        console.log('hair');
        type = 'Hair';
        add = new item(id, image, type, viewport);
        self.removeChildType(self.accessoriesLayer, 'Hair');
        self.accessoriesLayer.addChild(add);
      }

      else if ( id === '2' || id === '11' || id === '21' || id === '25' || id === '48' || id === '55' ) {
        // HATS
        console.log('hats');
        type = 'Hats';
        add = new item(id, image, type, viewport);
        self.removeChildType(self.accessoriesLayer, 'Hats');
        self.accessoriesLayer.addChild(add);
      }

      else if ( id === '6' || id === '10' || id === '20' || id === '31' ) {
        // SHOES
        console.log('shoes');
        type = 'Shoes';
        add = new item(id, image, type, viewport);
        self.removeChildType(self.accessoriesLayer, 'Shoes');
        self.accessoriesLayer.addChild(add);
      }

      else if ( id === '3' || id === '27' || id === '33' || id === '38' || id === '47' ) {
        // FACELAYER
        console.log('facelayer');
        type = 'FaceLayer';
        add = new item(id, image, type, viewport);
        self.faceLayer.addChild(add);
      }

      else if ( id === '30' || id === '26' || id === '28' || id === '42' || id === '49' || id === '54' ) {
        // FACELAYERGLASSES
        console.log('glasses');
        type = 'Glasses';
        add = new item(id, image, type, viewport);
        self.removeChildType(self.faceLayer, 'Glasses');
        self.faceLayer.addChild(add);
      }

      else if ( id === '39' ) {
        // LOW ACCESSORIES
        console.log('cape');
        type = 'Low Accessories';
        // increase alpha of cape - same ping in animation? TODO
        // kick off an anime tween
        self.cape.alpha = 1;

      }

    else {
      // ACCESSORIES
      console.log('accessories');
      type = 'Accessories';
      add = new item(id, image, type, viewport);
      self.route.addChild(add);
    }

    // ACCESSORIES 4,7,9,12,13,14,15,16,17,19,23,24,34,36,41,43,44,50,51,53,56,57,58,59,60,61
    // LOW ACCESSORIES 39
    // CLOTHES 40,30,32,35,45
    // HAIR 1,8,18,22,29,37,46,52
    // HATS 2,11,21,25,48,55
    // SHOES 6,10,20,31
    // FACELAYER 3,27,33,38,47
    // FACELAYERGLASSES 5,26,28,42,49,54


  };



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

  // scroll left and then right to demonstrate TODO


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

init.prototype.startAnimate = function () {
  // init first render cycle
  requestAnimationFrame(this.animate.bind(this));

};

init.prototype.animate = function () {
  this.count += 0.01;
  // renderTexture
  this.renderer.render(this.initArm.armCanvas, this.rt);

  // render loop
  requestAnimationFrame(this.animate.bind(this));

  // loop animating toucanoo route TODO

  // arm animations loop TODO
  for (var i = 1; i < this.points.length; i++) {

      this.points[0].y = 0;
      this.points[0].x = 0;

      // Wiggle
      this.points[i].y = Math.pow( i, 1.35 * (Math.sin(3.5 * this.count) + 0.1 * Math.sin(5.5 * this.count + 60) + 0.2 * Math.sin(7.5 * this.count + 120))) - Math.pow( i, Math.sin(3.5 * this.count) + 0.1 * Math.sin(5.3 * this.count + 60) + 0.2 * Math.sin(7.8 * this.count + 120));
      this.points[i].x = i * this.ropeLength - 0.5 * Math.pow( i, Math.sin(3.2 * this.count + 5) + 0.2 * Math.sin(8 * this.count + 30));

       // points[i].x = (ropeLength * i) - i * (ropeLength/2);
      // points[i].x = i * this.ropeLength + Math.cos((i * 0.3) + this.count) * 20;
  }

// this.points[i].y = Math.pow( i, 4 * Math.sin(0.4 * i + 15 * this.count));
// this.points[i].y = 4 * Math.sin(0.4 * i + 15 * this.count);

  // call arm wave tween on intervals (modulus?) TODO

  // render the stage
  this.renderer.render(this.stage);


};

init.prototype.makeBody = function() {
  // add name container banner
  this.banner = new PIXI.Sprite.fromFrame('b1.png');
  this.banner.anchor.x = 0.5;
  this.banner.anchor.y = 0.5;
  this.banner.position.x = this.cWidth / 2;
  this.banner.position.y = 40;
  // Add when exporting - when to add child/toucanoo name? Popup modal? TODO
  // this.viewport.addChild(this.banner);

  // construct base toucanoo
  this.initBody = new body(this.bodyLayer, this.faceLayer, this.cWidth, this.cHeight);

};

init.prototype.makeArms = function() {
  // construct toucanoo arms

  this.initArm = new arm();
  // arm sprites
  // this.armSpriteR = new PIXI.Sprite(this.rt);
  // this.armSpriteR.anchor.set(0.85,0.5);
  // this.armLayer.addChild(this.armSpriteR);
  // this.armSpriteR.rotation = - 0.89;
  // this.armSpriteR.position.set(185,397);

  // this.armSpriteL = new PIXI.Sprite(this.rt);
  // this.armSpriteL.anchor.set(0.85,0.5);
  // this.armSpriteL.scale.x = -1;
  // this.armLayer.addChild(this.armSpriteL);
  // this.armSpriteL.rotation = 0.89;
  // this.armSpriteL.position.set(416,397);

  // Arm rope
  for (var i = 0; i < 20; i++)
  {
      this.points.push(new PIXI.Point(i * this.ropeLength, null));
  }
  this.ropeR = new PIXI.mesh.Rope(this.rt, this.points);
  this.ropeR.pivot.x = 38;
  this.ropeR.pivot.y = 0;
  this.ropeR.scale.x = -1;
  this.armLayer.addChild(this.ropeR);
  this.ropeR.rotation = - 0.89;
  this.ropeR.position.x = 183;
  this.ropeR.position.y = 406;

  // Rarm pivot visual
  this.visualPivotR = new PIXI.Circle(this.ropeR.position.x, this.ropeR.position.y, 5);
  this.drawHit = new PIXI.Graphics();
  this.drawHit.beginFill(0xffd900);
  this.drawHit.drawShape(this.visualPivotR);

  //L rope
  this.ropeL = new PIXI.mesh.Rope(this.rt, this.points);
  this.ropeL.pivot.x = 38;
  this.ropeL.pivot.y = 0;
  this.armLayer.addChild(this.ropeL);
  this.ropeL.rotation = 0.89;
  this.ropeL.position.x = 418;
  this.ropeL.position.y = 405;


  // Larm pivot visual
  this.visualPivotL = new PIXI.Circle(this.ropeL.position.x, this.ropeL.position.y, 5);
  this.drawHit.drawShape(this.visualPivotL);
  this.armLayer.addChild(this.drawHit);
};

init.prototype.changeArms = function(id) {
  // change arms - functionality in arm constructor
  this.initArm.changeArmClothes(id);
};

init.prototype.removeChildType = function(parent, type) {
    for (var i = parent.children.length - 1; i >= 0; i--) {
        if ( parent.children[i].type === type ) {
      	parent.removeChild(parent.children[i]);
      }
    }

};


module.exports = new init();
