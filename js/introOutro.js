//Intro Outro controller

var PIXI = require('pixi.js');
var anime = require('animejs');

var io = function (init) {

  var self = this;

  this.init = init;

  //fader
  this.fader = document.getElementById('fader');

  //modals
  this.introModal = document.getElementById('intro-modal');
  this.printModal = document.getElementById('print-modal');

  //intro buttons
  this.startBtn = document.getElementById('get-started');
  this.startBtn.addEventListener( 'click' , function() {self.onIntroClick();}, false );

  //outtro buttons
  this.endBtn = document.getElementById('print-btn');
  this.endBtn.addEventListener( 'click' , function() {self.onOutroClick();}, false );

  //let's get started
  this.onIntroClick = function(event) {
  self.fader.setAttribute('class', 'fade-bk hidden');
  self.introModal.setAttribute('class', 'modal callout hidden');
  self.init.startFaceAnimate(); // start face update loop
  self.init.startAnimate(); // start main update and rendering loops

  // waking scene and animations TODO
  };

  this.onOutroClick = function(event) {
  self.fader.setAttribute('class', 'fade-bk');
  self.printModal.setAttribute('class', 'modal callout');
  self.init.printPipe();
  };

  //

  // print preview
  this.output = document.getElementById('output');
  this.preview = document.getElementById('preview-output');

  // name text input
  this.textInput = document.getElementById('text-field');
  this.useValue = function(event) {
    var nameValue = self.textInput.value;
    self.addText(nameValue);
  };
  this.textInput.onchange = this.useValue;
  this.textInput.onblur = this.useValue;
  this.textInput.onkeyup = this.useValue;

  // Print and back buttons
  this.doPrintBtn = document.getElementById('print-do');


  this.doBackBtn = document.getElementById('back-do');
  this.doBackBtn.addEventListener( 'click' , function() {self.doBack();}, false );
  this.doBack = function(event) {
    self.init.reversePrintPipe();
    self.printModal.setAttribute('class', 'modal callout hidden');
    self.fader.setAttribute('class', 'fade-bk hidden');
    // why does it speed up the count? TODO
  };


};

io.prototype.addText = function(text) {
  this.init.setNameText(text);
};

io.prototype.doPreview = function() {

  this.outputPreview = output.toDataURL("image/png", 1);
  this.preview.src = init.outputPreview;

};

module.exports = io;
