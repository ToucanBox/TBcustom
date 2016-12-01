//TBcustom

/*

Double click/tap to delete, or undo? Since clothing is replace rather than add TODO

If dropped near face, add to face group? Or face type? TODO

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
  init.initBody.startAnimate(); // face update loop
  init.startAnimate();


  // Remove loader overlay
  var loader = document.getElementById('busy');
  loader.style.display = 'none';

  // TESTING



  } //end load init ------------------------------------------------------

}); //end window load
