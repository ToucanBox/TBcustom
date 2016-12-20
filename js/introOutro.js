//Intro Outro controller

// TODO render large size for print - different from preview

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
  this.startBtn = document.getElementById('get-started-girl');
  this.startBtn.addEventListener( 'click' , function() {self.onIntroClickGirl();}, false );
  this.startBtn = document.getElementById('get-started-boy');
  this.startBtn.addEventListener( 'click' , function() {self.onIntroClickBoy();}, false );

  //outtro buttons
  this.endBtn = document.getElementById('print-btn');
  this.endBtnSave = document.getElementById('save-btn');
  this.endBtn.addEventListener( 'click' , function() {self.onOutroClick();}, false );
  this.endBtnSave.addEventListener( 'click' , function() {self.onOutroClickSave();}, false );

  //outro Save modal swaps
  this.saveTitle = document.getElementById('print-modal-title');
  this.saveText = document.getElementById('print-modal-blurb');

  //let's get started
  this.onIntroClickGirl = function(event) {
  self.fader.setAttribute('class', 'fade-bk hidden');
  self.introModal.setAttribute('class', 'modal callout hidden');
  self.init.startFaceAnimate(); // start face update loop
  self.init.startAnimate(); // start main update and rendering loops
  self.init.startGirl();

  // waking scene and animations TODO
  };

  this.onIntroClickBoy = function(event) {
  self.fader.setAttribute('class', 'fade-bk hidden');
  self.introModal.setAttribute('class', 'modal callout hidden');
  self.init.startFaceAnimate(); // start face update loop
  self.init.startAnimate(); // start main update and rendering loops
  self.init.startBoy();

  // waking scene and animations TODO
  };

  this.onOutroClick = function(event) {
  self.fader.setAttribute('class', 'fade-bk');
  self.printModal.setAttribute('class', 'modal callout');
  self.init.printPipe();
  self.doPreview();
  };

  this.onOutroClickSave = function(event) {
  this.doPrintBtn.style.display = 'none';
  this.doSaveBtn.style.display = 'inline';
  this.saveTitle.innerHTML = 'Ready to Save';
  this.saveText.innerHTML = 'Great, your Toucanoo looks fantastic! Type their name in the box below and it will appear on the image. Click save to save the image for printing later. Visit <a href="http://www.toucanbox.com">www.toucanbox.com</a> for more creative adventures!';
  self.fader.setAttribute('class', 'fade-bk');
  self.printModal.setAttribute('class', 'modal callout');
  self.init.printPipe();
  self.doPreview();
  };

  // print preview
  this.output = document.getElementById('output');
  this.preview = document.getElementById('preview-output');

  // name text input
  this.textInput = document.getElementById('text-field');
  this.useValue = function(event) {
    var nameValue = self.textInput.value;
    self.addText(nameValue);
    self.doPreview();
  };
  this.textInput.onchange = this.useValue;
  this.textInput.onblur = this.useValue;
  this.textInput.onkeyup = this.useValue;

  // Print save and back buttons
  this.doPrintBtn = document.getElementById('print-do');
  this.doPrintBtn.addEventListener( 'click' , function() {self.doPrint();}, false );
  this.doPrint = function(event) {
    self.init.printCanvas(false);
  };

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

    this.doPrintBtn.style.display = 'inline';
    this.doSaveBtn.style.display = 'none';
    this.saveTitle.innerHTML = 'Ready to Print';
    this.saveText.innerHTML = 'Great, your Toucanoo looks fantastic! Type their name in the box below and it will appear on the print-out. Click print to send it to your printer. Visit <a href="http://www.toucanbox.com">www.toucanbox.com</a> for more creative adventures!';

  };


};

io.prototype.addText = function(text) {
  this.init.setNameText(text);
};

io.prototype.doPreview = function() {

  this.canvasData = this.init.getCanvasImage();
  this.preview.src = this.canvasData;

};

module.exports = io;
