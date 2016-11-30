// add object

// Create and add combined arm sprite to scene
this.armSprite = new PIXI.Sprite(this.renderTexture);
route.addChild(this.armSprite);
console.log('arm added');



// testing code

//Libraries
var PIXI = require('pixi.js');
var anime = require('animejs');

document.addEventListener("DOMContentLoaded", function(event) {

var armBase, armPjs;

//Screen size event
require('/Users/anthonymoles/Documents/TBcustom/js/canvasSizer.js');

// Load Assets
PIXI.loader
    .add('spritesheet', 'img/canvas/base-arms.json')
    .add('items', 'img/canvas/items.json')
    .on("progress", loadProgressHandler)
    .load(onAssetsLoaded);

function loadProgressHandler(loader, loadedResource) {
  console.log('Progress:', loader.progress + '%');
}

function onAssetsLoaded() {

  // TESTING
  var canvas = document.getElementById('Pcanvas');
  var testCanvas = document.getElementById('test-canvas');

  var renderer = PIXI.autoDetectRenderer(600, 720, { transparent: true, antialias: true });
  canvas.appendChild(renderer.view);

  var stage = new PIXI.Container();

  var route = new PIXI.Container();
  stage.addChild(route);

  var graphics = new PIXI.Graphics();
  graphics.lineStyle(1, 0xffd900, 1);

  graphics.moveTo(0,0);
  graphics.lineTo(600, 0);
  graphics.lineTo(600, 720);
  graphics.lineTo(0, 720);
  graphics.lineTo(0, 0);
  route.addChild(graphics);

  var body = new PIXI.Sprite.fromFrame('b2.png');
  route.addChild(body);



  /////////////////////

  var armCanvas = new PIXI.Container();

  addArm();
  animate();






  function addArm() {

  // Place base arm sprite
  armCanvas.pivot.x = renderer.width / 2;
  armCanvas.pivot.y = renderer.height / 2;
  armCanvas.position.x = renderer.width / 2 + 2;
  armCanvas.position.y = renderer.height / 2;

  var armBase = new PIXI.Sprite.fromFrame('a1.png');
  armCanvas.addChild(armBase);

  var armPjs = new PIXI.Sprite.fromFrame('a3.png');
  armCanvas.addChild(armPjs);

  // test frame for canvas
  var testFrame = new PIXI.Graphics();
  testFrame.lineStyle(1, 0xffd900, 1);
  armCanvas.addChild(testFrame);

  testFrame.moveTo(0,0);
  testFrame.lineTo(192, 0);
  testFrame.lineTo(192, 78);
  testFrame.lineTo(0, 78);
  testFrame.lineTo(0, 0);

  // Create render texture
  var baseRenderTexture = new PIXI.BaseRenderTexture(renderer, 200, 80, PIXI.SCALE_MODES.LINEAR, 1);
  var renderTexture = new PIXI.RenderTexture(baseRenderTexture);

  // Create and add combined arm sprite to scene
  var armSprite = new PIXI.Sprite(renderTexture);
  armSprite.position.x = 200;
  armSprite.position.y = 200;
  route.addChild(armSprite);
}






  function animate() {
    renderer.render(stage);

    // Render to test canvas
      // renderer.render(armCanvas, testCanvas);

    // Render to render texture
    renderer.render(graphics, renderTexture);


    // render loop
    requestAnimationFrame(animate);
  }

} //end load init ------------------------------------------------------



}); //end window load



// using texture cache instead of arrays - seem to populate too late for building the body and arms

  for (i = 1; i <= 5; i++)
    {
      var textureBody = PIXI.Texture.fromFrame( 'a' + i + '.png' );
      this.armsTextures.push(textureBody);
    }

  for (i = 1; i <= 8; i++)
    {
      var textureArm = PIXI.Texture.fromFrame( 'b' + i + '.png' );
      this.bodyTextures.push(textureArm);
    }


// OLD


// original vars

var count = 0;
var othercount = 0;
var dir = {a:1,b:1,c:1,d:0};
var points = [];
var g, ropeLength, strip, items;




makeRope();
makeG();




  function makeRope() {
    // build a rope!
    ropeLength = 918 / 22;

    for (var i = 0; i < 20; i++)
    {
        points.push(new PIXI.Point(i * ropeLength, null));
    }

    strip = new PIXI.mesh.Rope(PIXI.Texture.fromImage('img/Path_1.png'), points);

    // Makeinitial bend
    for (var i = 0; i < points.length; i++) {

          points[i].y = Math.pow( i, 2);
    }

    strip.position.x = 10;
    strip.position.y = 200;

    strip.interactive = true;
    strip.on('mousedown', animatePoints);
    strip.on('touchstart', animatePoints);

    stage.addChild(strip);
  }

  function makeG() {

    g = new PIXI.Graphics();

    g.x = strip.x;
    g.y = strip.y;
    stage.addChild(g);

  }

  function animateArm(count) {
    for (var i = 1; i < points.length; i++) {

        points[0].y = 0;
        points[0].x = 0;

        points[i].y = Math.pow( i, 2 ) + Math.sin((i * 0.05) + count) * (i * 2);
        points[i].x = i * ropeLength - Math.pow( i, 2 * Math.sin(count));

         // points[i].x = (ropeLength * i) - i * (ropeLength/2);
        // points[i].x = i * ropeLength + Math.cos((i * 0.3) + count) * 20;
    }
  }

  function animateArm2(count) {
    for (var i = 1; i < points.length; i++) {

        points[0].y = 0;
        points[0].x = 0;

        points[i].y = dir.a * Math.pow( i, dir.c * 2 ) - Math.sin((i * 0.05) + count) * (i * 2);
        points[i].x = i * ropeLength - Math.pow( i, 2.1 * dir.b) - dir.d * Math.pow( i , 2 );

    }
  }

  function renderPoints() {

      g.clear();

      g.lineStyle(2,0xff0022);
      g.moveTo(points[0].x,points[0].y);

      for (var i = 1; i < points.length; i++) {
          g.lineTo(points[i].x,points[i].y);
      }

      for (i = 1; i < points.length; i++) {
          g.beginFill(0xff0022);
          g.drawCircle(points[i].x,points[i].y,10);
          g.endFill();
      }
  }


  function animatePoints() {

    var animePointsA = anime({
    targets: dir,
    a: -1,
    b: -1,
    d: 1,
    autoplay: false,
    duration: 2000,
    complete: function() {
      var animePointsB = anime({
      targets: dir,
      a: 1,
      b: 1,
      d: 0,
      duration: 500,
      delay: 200,
      easing: 'easeOutQuint'
      });
    }
  });

    animePointsA.play();

  }
