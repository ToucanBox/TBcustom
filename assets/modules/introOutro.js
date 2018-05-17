//Intro Outro controller

var PIXI = require('pixi.js');
var anime = require('animejs');

var io = function (init) {

  var self = this;

  this.init = init;

  //fader
  this.fader = document.getElementById('fader');

  //modals
  this.printModal = document.getElementById('print-modal');
  this.adviceModal = document.getElementById('advice-modal');

  //outtro button
  this.endBtn = document.getElementById('print-btn');
  this.endBtn.addEventListener( 'click' , function() {self.onOutroClick();}, false );

  this.onOutroClick = function(event) {
  self.fader.setAttribute('class', 'fade-bk');
  self.printModal.setAttribute('class', 'modal');
  self.init.printPipe();
  self.doPreview();
  };

  //advice button
  this.adviceBtn = document.getElementById('print-advice');
  this.adviceBtn.addEventListener( 'click' , function() {self.showAdvice();}, false );
  this.showAdvice = function() {
    self.adviceModal.setAttribute('class', 'modal');
    self.printModal.setAttribute('class', 'modal hidden');
    self.imgAdvice = document.getElementById('img-indicator');
    self.imgAdvice.setAttribute('class', ' ');
  };

  // advice back
  this.adviceBack = document.getElementById('advice-back-do');
  this.adviceBack.addEventListener( 'click' , function() {self.closeAdvice();}, false );
  this.closeAdvice = function() {
    self.adviceModal.setAttribute('class', 'modal hidden');
    self.printModal.setAttribute('class', 'modal');
  };

  // print preview
  this.output = document.getElementById('output');
  this.preview = document.getElementById('preview-output');

  // Print, PDF and back buttons
  this.doPrintBtn = document.querySelectorAll('.print-do');
  for (var i = 0; i < this.doPrintBtn.length; i++) {
    this.doPrintBtn[i].addEventListener( 'click' , function() {self.doPrint();}, false );
      this.doPrint = function(event) {
        self.init.printCanvas();
      };
  }

  this.doPDFBtn = document.querySelectorAll('.save-do');
  for (var i = 0; i < this.doPDFBtn.length; i++) {
    this.doPDFBtn[i].addEventListener( 'click' , function() {self.doPDF();}, false );
    this.doPDF = function(event) {
      self.init.saveCanvas();
    };
  }

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

  this.doBackBtn = document.querySelectorAll('.back-do');
  for (var i = 0; i < this.doBackBtn.length; i++) {
    this.doBackBtn[i].addEventListener( 'click' , function() {self.doBack();}, false );
  }
  this.doBack = function(event) {
    self.init.reversePrintPipe();
    self.printModal.setAttribute('class', 'modal hidden');
    self.fader.setAttribute('class', 'fade-bk hidden');
  };


  // intro demoSequence
  setTimeout(function() { self.demoSequence(); }, 4000);


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
this.init.startGirl();
// this.init.startFaceAnimate(); // start face update loop
// this.init.startAnimate(); // start main update and rendering loops
};


io.prototype.onIntroBoy = function() {
this.init.startBoy();
// this.init.startFaceAnimate();
// this.init.startAnimate();
};

io.prototype.onIntroNeutralPjs = function() { //TODO
// this.init.startFaceAnimate();
// this.init.startAnimate();
this.init.startPj();
};

io.prototype.onIntroScottish = function() { //TODO
// this.init.startFaceAnimate();
// this.init.startAnimate();
this.init.startScottish();
};

io.prototype.onIntroNeutralNaked = function() {
// this.init.startFaceAnimate();
// this.init.startAnimate();
};

io.prototype.demoSequence = function () {

  console.log('hello demo');

  var self = this;

  this.indicator = document.getElementById('indicator');
  this.indicator.style.display = 'block';

  // calc transform to move to center of screen
  var centreX = window.innerWidth / 2;
  var centreY = window.innerHeight / 2;
  var origX = this.indicator.offsetLeft;
  var origY = this.indicator.offsetTop;
  var xTransition = centreX - origX;
  var yTransition = centreY - origY;

  var intro = anime({
  targets: this.indicator,
  scale: {
    value: 0.97,
    duration: 300,
    delay: 800,
    easing: 'easeInOutExpo'
  },
  translateX: {
    value: xTransition,
    duration: 1800,
    delay: 1100,
    easing: 'easeInOutQuad'
  },
  translateY: {
    value: yTransition,
    duration: 1800,
    delay: 1100,
    easing: 'easeInOutQuad'
  },
  opacity: {
    value: 1,
    duration: 900,
    easing: 'easeInOutExpo'
  },
  complete: function() {
    anime.remove(intro);
    var introEnd = anime({
      targets: '.indicatorImg',
      opacity: 0,
      duration: 1100,
      easing: 'easeInOutExpo',
      scale: {
        value: 1.03,
        duration: 300,
        easing: 'easeInOutExpo'
      },
      autoplay: true,
      complete: function() {self.indicator.style.display = 'none';}
    });
}
});



};


io.prototype.getStarted = function() {

  this.type = window.location.search.substring(1);
  console.log(this.type);
  if (this.type === 'girl') {
    this.onIntroGirl();
  } else if (this.type === 'boy') {
    this.onIntroBoy();
  } else if (this.type === 'pjs') {
    this.onIntroNeutralPjs();
  } else if (this.type === 'debug') {
    this.onIntroNeutralNaked();
    this.testCanvasTarget = document.getElementById('canvas-main');
    this.testOutputParent = document.getElementsByClassName('space')[0];
    this.testOutput = document.createElement('div');
    setTimeout(function() {
      this.testScale = this.testCanvasTarget.style.transform;
      console.log(this.testScale);
      this.testOutput.innerHTML = 'height: ' + window.innerHeight + ', width: ' + window.innerWidth + ', canvas transform: ' + this.testScale;
      this.testOutputParent.appendChild(this.testOutput);
    }.bind(this), 5000);
  } else if (this.type === 'scottish') {
    this.onIntroScottish();
  } else {
    this.onIntroNeutralNaked();
  }
};

module.exports = io;
