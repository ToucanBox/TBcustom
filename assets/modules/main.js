// TBcustom

// Intro sequence TODO

// Libraries
var PIXI = require('pixi.js');
var anime = require('animejs');

document.addEventListener('DOMContentLoaded', function(event) {

// Load Assets
var loader = PIXI.loader;
loader
    .add('base', '../assets/img/canvas/base-arms.json')
    .add('items', '../assets/img/canvas/items.json')
    .on("progress", loadProgressHandler)
    .load(onAssetsLoaded);

function loadProgressHandler(loader, loadedResource) {
  console.log('Progress:', loader.progress + '%');
}

function onAssetsLoaded() {

  // Initialiser object (module exports new init)
  var init = require('./init.js');
  init.loadTextures();
  init.populatePalette();
  init.initSlider(window.innerWidth, window.innerHeight);
  // init.makeTestFrame();
  init.makeBody();
  init.makeArms();

  var introOutro = require('./introOutro.js');
  var io = new introOutro(init);
  io.getStarted();

  var event = undefined;
  // Screen size event
  var canvasSizer = require('./canvasSizer.js');
  canvasSizer.resize(event);

  setTimeout(function(){
    init.startFaceAnimate();
    init.startAnimate();
    // Remove loader overlay
    var loader = document.getElementById('busy');
    loader.style.display = 'none';
    setTimeout(function(){
      init.animateWave();
    }, 1000)
  }, 500);


  } // end load init ------------------------------------------------------

}); //
