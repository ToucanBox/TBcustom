//Intro Outro controller

var PIXI = require('pixi.js');
var anime = require('animejs');

var io = function (init, canvasSizer) {

  var self = this;

  this.init = init;
  this.canvasSizer = canvasSizer;

  //fader
  this.fader = document.getElementById('fader');

  //modal
  this.printModal = document.getElementById('print-modal');

  //outtro buttons
  this.endBtn = document.getElementById('print-btn');
  this.endBtnSave = document.getElementById('save-btn');
  this.endBtn.addEventListener( 'click' , function() {self.onOutroClick();}, false );
  this.endBtnSave.addEventListener( 'click' , function() {self.onOutroClickSave();}, false );

  //outro Save modal swaps
  this.saveTitle = document.getElementById('print-modal-title');
  this.saveText = document.getElementById('print-modal-blurb');

  this.onOutroClick = function(event) {
  self.fader.setAttribute('class', 'fade-bk');
  self.printModal.setAttribute('class', 'modal callout');
  self.init.printPipe();
  self.doPreview();
  };

  this.onOutroClickSave = function(event) {
  self.doPrintBtn.style.display = 'none';
  self.doSaveBtn.style.display = 'inline';
  self.saveTitle.innerHTML = 'Ready to Save';
  self.saveText.innerHTML = 'Great, your Toucanoo looks fantastic! Type their name in the box below and it will appear on the image. Click save to save the image for printing later. Visit <a href="http://www.toucanbox.com">www.toucanbox.com</a> for more creative adventures!';
  self.fader.setAttribute('class', 'fade-bk');
  self.printModal.setAttribute('class', 'modal callout');
  self.init.printPipe();
  self.doPreview();
  };

  // print preview
  this.output = document.getElementById('output');
  this.preview = document.getElementById('preview-output');

  // Print save and back buttons
  this.doPrintBtn = document.getElementById('print-do');
  this.doPrintBtn.addEventListener( 'click' , function() {self.doPrint();}, false );
  this.doPrint = function(event) {
    self.init.printCanvas(false);
  };

  // name text input
  this.textInput = document.getElementById('text-field');
  this.useValue = function(event) {
    var nameValue = self.textInput.value;
    self.addText(nameValue);
    self.doPreview();
    if (event.keyCode == 13) {
       self.doPrintBtn.click();
     }
  };
  this.textInput.onchange = this.useValue;
  this.textInput.onblur = this.useValue;
  this.textInput.onkeyup = this.useValue;

  this.doSaveBtn = document.getElementById('save-do');
  this.doSaveBtn.addEventListener( 'click' , function() {self.doSave();}, false );
  this.doSave = function(event) {
    self.init.printCanvas(true);
  };

  this.doBackBtn = document.getElementById('back-do');
  this.doBackBtn.addEventListener( 'click' , function() {self.doBack();}, false );
  this.doBack = function(event) {
    self.init.reversePrintPipe();
    self.printModal.setAttribute('class', 'modal callout hidden');
    self.fader.setAttribute('class', 'fade-bk hidden');

    self.doPrintBtn.style.display = 'inline';
    self.doSaveBtn.style.display = 'none';
    self.saveTitle.innerHTML = 'Ready to Print';
    self.saveText.innerHTML = 'Great, your Toucanoo looks fantastic! Type their name in the box below and it will appear on the print-out. Click print to send it to your printer. Visit <a href="http://www.toucanbox.com">www.toucanbox.com</a> for more creative adventures!';

    self.canvasSizer.resize();

  };


};

io.prototype.addText = function(text) {
  this.init.setNameText(text);
};

io.prototype.doPreview = function() {

  this.canvasData = this.init.getCanvasImage();
  this.preview.src = this.canvasData;
};

//let's get started
// waking scene and animations TODO

io.prototype.onIntroGirl = function() {
this.init.startFaceAnimate(); // start face update loop
this.init.startAnimate(); // start main update and rendering loops
this.init.startGirl();
};

io.prototype.onIntroBoy = function() {
this.init.startFaceAnimate();
this.init.startAnimate();
this.init.startBoy();
};

io.prototype.onIntroNeutralPjs = function() { //TODO
this.init.startFaceAnimate();
this.init.startAnimate();
this.init.startPj();
};

io.prototype.onIntroNeutralNaked = function() {
this.init.startFaceAnimate();
this.init.startAnimate();
};


io.prototype.getStarted = function() {

  this.gender = window.location.search.substring(1);
  console.log(this.gender);
  if (this.gender === 'girl') {
    this.onIntroGirl();
  } else if (this.gender === 'boy') {
    this.onIntroBoy();
  } else if (this.gender === 'pjs') {
    this.onIntroNeutralPjs();
  } else {
    this.onIntroNeutralNaked();
  }
};

module.exports = io;
