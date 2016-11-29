//TBcustom

/*

Double click/tap to delete, or undo? Since clothing is replace rather than add

If dropped near face, add to face group? Or face type?

*/

//Libraries
var PIXI = require('pixi.js');
var anime = require('animejs');

document.addEventListener("DOMContentLoaded", function(event) {

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

  //Item constructor, for testing only
  var item = require('/Users/anthonymoles/Documents/TBcustom/js/item.js');

  //Initialiser object (module exports new init)
  var init = require('/Users/anthonymoles/Documents/TBcustom/js/init.js');
  init.loadTextures();
  init.populatePalette();
  init.initSlider();
  init.makeTestFrame();
  init.makeBody();
  init.makeArms();

  // Remove loader overlay
  var loader = document.getElementById('busy');
  loader.style.display = 'none';

  // TESTING
  var test2 = new item(61, init.itemTextures[60]);
  test2.position.x = 300;
  init.viewport.addChild(test2);

  var test = new item(1 , init.itemTextures[0]);
  init.viewport.addChild(test);


  } //end load init ------------------------------------------------------

}); //end window load
