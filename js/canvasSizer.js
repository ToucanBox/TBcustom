//canvasSizer

var canvasSizer = function () {

  this.canvas = document.getElementById('canvas-main');

  this.socialBtns = document.getElementById('social-container');

  this.logo = document.querySelector('.logo');

  this.resize = function(event) {

    // Share container position
    this.socialBtns.style.top = this.height / 2 - 105 - 65 + 'px';

    // logo or not
    if (599 >= window.innerWidth) {
      this.logo.style.position = 'relative';
      this.logo.style.top = '-40px';
      this.logo.style.webkitTransform = 'scale(0.75)';
      this.logo.style.MozTransform = 'scale(0.75)';
      this.logo.style.msTransform = 'scale(0.75)';
      this.logo.style.OTransform = 'scale(0.75)';
      this.logo.style.transform =  'scale(0.75)';
    }


    this.height = window.innerHeight;
    this.width = window.innerWidth;

    this.intendedHeight = this.height - 180;

    this.scale = this.intendedHeight/720;

    this.screenRatio = this.width/this.height;

    this.resetScale = 1;

    if (this.screenRatio > 0.7) {
      this.resetScale = this.scale;
      this.canvas.style.webkitTransform = 'scale(' + this.scale + ',' + this.scale + ')';
      this.canvas.style.MozTransform = 'scale(' + this.scale + ',' + this.scale + ')';
      this.canvas.style.msTransform = 'scale(' + this.scale + ',' + this.scale + ')';
      this.canvas.style.OTransform = 'scale(' + this.scale + ',' + this.scale + ')';
      this.canvas.style.transform =  'scale(' + this.scale + ',' + this.scale + ')';
    }

    // handles iphone 4 size screens

    this.smallScreenScale = 0.78;

    if (this.screenRatio > 0.65 && this.width <= 320) {
      this.resetScale = this.smallScreenScale;
      this.canvas.style.webkitTransform = 'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
      this.canvas.style.MozTransform = 'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
      this.canvas.style.msTransform = 'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
      this.canvas.style.OTransform = 'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
      this.canvas.style.transform =  'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
    }

    // handle small scale after screen rotate on devices
    if (event !== undefined) {
      if (event.type !== 'resize') {

        this.canvas.style.webkitTransform = 'scale(' + this.resetScale + ',' + this.resetScale + ')';
        this.canvas.style.MozTransform = 'scale(' + this.resetScale + ',' + this.resetScale + ')';
        this.canvas.style.msTransform = 'scale(' + this.resetScale + ',' + this.resetScale + ')';
        this.canvas.style.OTransform = 'scale(' + this.resetScale + ',' + this.resetScale + ')';
        this.canvas.style.transform =  'scale(' + this.resetScale + ',' + this.resetScale + ')';
        console.log('reorient');
      }
  }

    console.log('resize');

  };

  window.addEventListener('resize', this.resize.bind(this, event));
  window.addEventListener('orientationchange', this.resize.bind(this, event));


};


module.exports = new canvasSizer();
