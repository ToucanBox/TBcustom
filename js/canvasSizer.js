//canvasSizer

var canvasSizer = function () {

};

canvasSizer.prototype.resize = function() {

  this.canvas = document.getElementById('canvas-main');

  // Share container position
  this.socialBtns = document.getElementById('social-container');
  this.socialBtns.style.top = this.height / 2 - 105 - 65 + 'px';


  this.height = window.innerHeight;
  this.width = window.innerWidth;

  this.intendedHeight = this.height - 180;

  this.scale = this.intendedHeight/720;

  this.screenRatio = this.width/this.height;

  if (this.screenRatio > 1) {
    this.canvas.style.webkitTransform = 'scale(' + this.scale + ',' + this.scale + ')';
    this.canvas.style.MozTransform = 'scale(' + this.scale + ',' + this.scale + ')';
    this.canvas.style.msTransform = 'scale(' + this.scale + ',' + this.scale + ')';
    this.canvas.style.OTransform = 'scale(' + this.scale + ',' + this.scale + ')';
    this.canvas.style.transform =  'scale(' + this.scale + ',' + this.scale + ')';
  }

  this.smallScreenScale = 0.78;

  if (this.screenRatio > 0.65 && this.width <= 320) {
    this.canvas.style.webkitTransform = 'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
    this.canvas.style.MozTransform = 'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
    this.canvas.style.msTransform = 'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
    this.canvas.style.OTransform = 'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
    this.canvas.style.transform =  'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
  }

  if (this.width < 600) {
    this.thirdPanel = document.getElementById('third-panel');
    this.thirdPanel.style.display = 'none';
  }

  console.log('resize');


};

module.exports = new canvasSizer();
