//Intro Outro controller

var PIXI = require('pixi.js');
var anime = require('animejs');

var io = function (init) {

  var self = this;

  this.init = init;

  //fader
  this.fader = document.getElementById('fader');

  //modals
  this.intoModal = document.getElementById('intro-modal');
  this.printModal = document.getElementById('print-modal');

  //intro buttons
  this.startBtn = document.getElementById('get-started');
  this.startBtn.addEventListener( 'click' , function() {self.onClick();}, false );

  //outtro buttons


  //let's get started
  this.onClick = function(event) {
  self.fader.setAttribute('class', 'fade-bk hidden');
  self.intoModal.setAttribute('class', 'modal callout hidden');
  self.init.startFaceAnimate(); // start face update loop
  self.init.startAnimate(); // start main update and rendering loops

  };

  // print preview
  this.output = document.getElementById('output');
  this.preview = document.getElementById('preview-output');

  this.textInput = document.getElementById('text-field');
  this.textValue = this.textInput.value;


};

io.prototype.addText = function() {
  this.init.textName.setText(this.textValue);
};

io.prototype.doPreview = function() {

  this.outputPreview = output.toDataURL("image/png", 1);
  this.preview.src = init.outputPreview;

};

io.prototype.printButton = function() {
  init.printPipe();
};

module.exports = io;
