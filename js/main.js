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
var lory = require('swipr');
var PIXI = require('pixi.js');
var anime = require('animejs');

document.addEventListener("DOMContentLoaded", function(event) {

//Screen events
var canvasSizer = require('/Users/anthonymoles/Documents/TBcustom/js/canvasSizer.js');

var count = 0;
var othercount = 0;
var dir = {a:1,b:1,c:1,d:0};
var points = [];
var g, ropeLength, strip, items;

var canvas = document.getElementById('Pcanvas')
var renderer = PIXI.autoDetectRenderer(600, 720, { transparent: true, antialias: true });
canvas.appendChild(renderer.view);
renderer.view.setAttribute('class', 'canvas-class');

var cWidth = renderer.width;
var cHeight = renderer.height;

// create the root of the scene graph
var stage = new PIXI.Container();

// ADD loading animation and overlay

// Load spritesheet
PIXI.loader
    .add('spritesheet', 'img/canvas/base-arms.json')
    .on("progress", loadProgressHandler)
    .load(onAssetsLoaded);

function loadProgressHandler(loader, loadedResource) {
  console.log('Progress:', loader.progress + '%');
};

function onAssetsLoaded() {

  // Remove loader overlay

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

  // start animating
  animate();

// Make items

  function item(id, image) {
    PIXI.Sprite.call(this, image);
    this.image = image;
    this.interactive = true;
    this.buttonMode = true;
    this.position.x = 200;
    this.position.y = 200;

    this
  // events for drag start
    .on('mousedown', onDragStart)
    .on('touchstart', onDragStart)
    // events for drag end
    .on('mouseup', onDragEnd)
    .on('mouseupoutside', onDragEnd)
    .on('touchend', onDragEnd)
    .on('touchendoutside', onDragEnd)
    // events for drag move
    .on('mousemove', onDragMove)
    .on('touchmove', onDragMove);
    // var item = new PIXI.Sprite(frames[i]);
  }

  item.prototype = Object.create(PIXI.Sprite.prototype);
  item.prototype.constructor = item;

  // Click to add items

  function onClick(event) {
    console.log(event.target.id);
    var id = event.target.id;
    var image = frames[id];
    var add = new item(id, image);
    add.anchor.set(0.5);
    stage.addChild(add);
    console.log(add);
  }


  // ANIMATE

  function animate() {

      count += 0.01;
    	othercount += Math.PI / 100;

      // render the stage
      renderer.render(stage);

      //visual points
      renderPoints();
      //Arm sin loop
      animateArm2(count);

      requestAnimationFrame(animate);
  }

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
      };

      for (var i = 1; i < points.length; i++) {
          g.beginFill(0xff0022);
          g.drawCircle(points[i].x,points[i].y,10);
          g.endFill();
      };
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

  // Need to include touch control - handle multitouch

  function onDragStart(event)
  {
      // store a reference to the data
      // the reason for this is because of multitouch
      // we want to track the movement of this particular touch
      this.data = event.data;
      this.alpha = 0.5;
      this.dragging = true;
      // if not added to body container, (remove from stage and) add to body container
  }

  function onDragEnd()
  {
      this.alpha = 1;

      this.dragging = false;

      // set the interaction data to null
      this.data = null;
  }

  function onDragMove()
  {
      if (this.dragging)
      {
          var newPosition = this.data.getLocalPosition(this.parent);
          this.position.x = newPosition.x;
          this.position.y = newPosition.y;
      }
  }

  } //end load init ------------------------------------------------------

}); //end window load
