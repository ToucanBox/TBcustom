//toucanoo

/*

Need a constructor for arms

Update item constructor to make new items from list items

html menu for selection - click desired object, add to stage at a corner (announce with pop), wiggling until first drag and release, maybe text 'put me somewhere'

Drag type and clothing type

Drag type: Drag in place message

Clothing type: appears in place (including arm tops), deletes existing
Tops and shoes/trouser are clothing type
Clothing type html icon does not equal canvas texture

Clothing and draggable shuffled together? In separate rows?

On iphone, min 4 items per row - how to make responsive?

Double click/tap to delete, or undo? Since clothing is replace rather than add

If dropped near face, add to face group? Or face type?

Shoes and hair of type where new instances delete old hair/shoes but still drag

Make object pool, 4 of each item?

Toucanoo wearing pyjamas, nightcap

*/

//Libraries
var PIXI = require('pixi.js');
var anime = require('animejs');

document.addEventListener("DOMContentLoaded", function(event) {

//Screen size event
require('/Users/anthonymoles/Documents/TBcustom/js/canvasSizer.js');

//Init
var canvas = document.getElementById('Pcanvas');
var renderer = PIXI.autoDetectRenderer(600, 720, { transparent: true, antialias: true });
canvas.appendChild(renderer.view);
renderer.view.setAttribute('class', 'canvas-class');

//canvas dimensions
var cWidth = renderer.width;
var cHeight = renderer.height;

// create the root of the scene graph
var stage = new PIXI.Container();

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

  var viewport = new PIXI.Container();
  viewport.pivot.x = cWidth/2;
  viewport.pivot.y = cHeight/2;

  viewport.position.x = cWidth/2;
  viewport.position.y = cHeight/2;

  stage.addChild(viewport);



  //Item constructor
  var item = require('/Users/anthonymoles/Documents/TBcustom/js/item.js');

  var node = document.getElementById('test');
  node.addEventListener( 'click' , testClick , false );
  function testClick() {
    var test3 = new item(40, init.itemTextures[40]);
    test3.position.x = 500;
    viewport.addChild(test3);
  }

  //Initialiser object (module exports new init)
  var init = require('/Users/anthonymoles/Documents/TBcustom/js/init.js');

  init.loadTextures();
  init.populatePalette();
  init.initSlider();

  // Remove loader overlay
  var loader = document.getElementById('busy');
  loader.style.display = 'none';

  animate();

  //TESTING frame

  var graphics = new PIXI.Graphics();
  graphics.lineStyle(1, 0xffd900, 1);

  graphics.moveTo(0,0);
  graphics.lineTo(600, 0);
  graphics.lineTo(600, 720);
  graphics.lineTo(0, 720);
  graphics.lineTo(0, 0);

  viewport.addChild(graphics);

  var texture = PIXI.Texture.fromFrame('b2.png');
  var sprite = new PIXI.Sprite(texture);
  sprite.anchor.x = 0.5;
  sprite.anchor.y = 0.5;
  sprite.position.x = cWidth/2;
  sprite.position.y = cHeight/2;
  viewport.addChild(sprite);

  // TESTING

  var test2 = new item(60, init.itemTextures[60]);
  test2.position.x = 300;
  viewport.addChild(test2);

  var test = new item(0 , init.itemTextures[0]);
  viewport.addChild(test);


  // ANIMATE

  function animate() {

      // render the stage
      renderer.render(stage);

      requestAnimationFrame(animate);
  }

  } //end load init ------------------------------------------------------

}); //end window load
