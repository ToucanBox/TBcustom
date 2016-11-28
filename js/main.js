//toucanoo

/*

Refactor and Browserify

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

//Screen events
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

  var itemTextures = [];
  var armsTextures = [];
  var bodyTextures = [];

  function loadTextures() {
  var i;

  for (i = 1; i < 61; i++)
    {
       var texture = PIXI.Texture.fromFrame( i + '.png' );
       itemTextures.push(texture);
    }

  for (i = 1; i < 5; i++)
    {
      var textureBody = PIXI.Texture.fromFrame( 'a' + i + '.png' );
      armsTextures.push(textureBody);
    }

  for (i = 1; i < 8; i++)
    {
      var textureArm = PIXI.Texture.fromFrame( 'b' + i + '.png' );
      bodyTextures.push(textureArm);
    }

  }

  loadTextures();

  // add elements to palette

  var icons = document.getElementById('icons');

  for (var i = 1; i <= 61; i++) {
    var node = document.createElement("li");
    node.className = 'js_slide sprite-icons icons-' + i;
    node.id = i;
    node.addEventListener( 'click' , onClick , false );
    icons.appendChild( node );
  }

  // Add slider

  var multiSlides = document.querySelector('.slider');

  lory(multiSlides, {
      infinite: 0,
      slidesToScroll: 3,
      rewind: true
  });

  // Click to add items

  function onClick(event) {
    var id = event.target.id;
    console.log(id);
    addItem(id);
  }

  // ADD ITEM

    function addItem(id) {
      // var image = frames[id];
      // var add = new item(id, image);
      // add.anchor.set(0.5);
      // stage.addChild(add);
      // console.log(add);
    }


  //Item constructor
  var item = require('/Users/anthonymoles/Documents/TBcustom/js/item.js');


  // Remove loader overlay
  var loader = document.getElementById('busy');
  loader.style.display = 'none';

  animate();

  //test frame
  var viewport = new PIXI.Container();
  viewport.pivot.x = cWidth/2;
  viewport.pivot.y = cHeight/2;

  viewport.position.x = cWidth/2;
  viewport.position.y = cHeight/2;

  stage.addChild(viewport);

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

  var test = new item(1 , itemTextures[1]);
  console.log(test);
  viewport.addChild(test);

  // ANIMATE

  function animate() {

      // render the stage
      renderer.render(stage);

      requestAnimationFrame(animate);
  }

  } //end load init ------------------------------------------------------

}); //end window load
