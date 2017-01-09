// TBcustom

// Intro sequence TODO

// Libraries
var PIXI = require('pixi.js');
var anime = require('animejs');

document.addEventListener('DOMContentLoaded', function(event) {

// logo or not
if (599 >= window.innerWidth) {
  var logo = document.querySelector('.logo');
  logo.style.opacity = 0;
}

// Load Assets
var loader = PIXI.loader;
loader
    .add('base', '../img/canvas/base-arms.json')
    .add('items', '../img/canvas/items.json')
    .on("progress", loadProgressHandler)
    .load(onAssetsLoaded);

function loadProgressHandler(loader, loadedResource) {
  console.log('Progress:', loader.progress + '%');
}

function onAssetsLoaded() {

  // Screen size event
  var canvasSizer = require('/Users/anthonymoles/Documents/TBcustom/js/canvasSizer.js');
  canvasSizer.resize();
  window.addEventListener('resize', canvasSizer.resize);

  // Initialiser object (module exports new init)
  var init = require('/Users/anthonymoles/Documents/TBcustom/js/init.js');
  init.loadTextures();
  init.populatePalette();
  init.initSlider(window.innerWidth, window.innerHeight);
  // init.makeTestFrame();
  init.makeBody();
  init.makeArms();
  // init.setNameText('yolo');

  var introOutro = require('/Users/anthonymoles/Documents/TBcustom/js/introOutro.js');
  var io = new introOutro(init, canvasSizer);

  // Remove loader overlay
  var loader = document.getElementById('busy');
  loader.style.display = 'none';

  // refire resize - unpredictable results from single firing
  canvasSizer.resize();

  } // end load init ------------------------------------------------------

}); //
