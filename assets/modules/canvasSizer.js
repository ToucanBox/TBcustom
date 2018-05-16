//canvasSizer

var canvasSizer = function () {

  this.canvas = document.getElementById('canvas-main');

  this.resize = function(event) {

    this.intendedHeight = window.innerHeight - 180; //(0.25 * window.innerHeight); Proportional if needed

    this.scale = this.intendedHeight/720;

    this.screenRatio = window.innerWidth/window.innerHeight;

    this.smallScreenScale = 0.78;

    this.resetScale = 1;

    // handle resize and reorient
    if (event !== undefined /*not first firing*/) {
      if (event.type !== 'resize') {
        console.log('reorient');

        this.canvas.style.webkitTransform = 'scale(' + this.scale + ',' + this.scale + ')';
        this.canvas.style.MozTransform = 'scale(' + this.scale + ',' + this.scale + ')';
        this.canvas.style.msTransform = 'scale(' + this.scale + ',' + this.scale + ')';
        this.canvas.style.OTransform = 'scale(' + this.scale + ',' + this.scale + ')';
        this.canvas.style.transform =  'scale(' + this.scale + ',' + this.scale + ')';
      } else {
          console.log('resize');

          if (this.screenRatio > 0.65 && window.innerWidth <= 360) {
            // handles iphone 4 size screens, and awkward squat screens on android
            this.resetScale = this.smallScreenScale; // for reorient
            this.canvas.style.webkitTransform = 'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
            this.canvas.style.MozTransform = 'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
            this.canvas.style.msTransform = 'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
            this.canvas.style.OTransform = 'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
            this.canvas.style.transform =  'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
          } else if (this.screenRatio > 0.72 /*mostly want to affect wide screens*/) {
                  this.canvas.style.webkitTransform = 'scale(' + this.scale + ',' + this.scale + ')';
                  this.canvas.style.MozTransform = 'scale(' + this.scale + ',' + this.scale + ')';
                  this.canvas.style.msTransform = 'scale(' + this.scale + ',' + this.scale + ')';
                  this.canvas.style.OTransform = 'scale(' + this.scale + ',' + this.scale + ')';
                  this.canvas.style.transform =  'scale(' + this.scale + ',' + this.scale + ')';
                } else {
                  this.canvas.style.webkitTransform = 'scale(' + this.resetScale + ',' + this.resetScale + ')';
                  this.canvas.style.MozTransform = 'scale(' + this.resetScale + ',' + this.resetScale + ')';
                  this.canvas.style.msTransform = 'scale(' + this.resetScale + ',' + this.resetScale + ')';
                  this.canvas.style.OTransform = 'scale(' + this.resetScale + ',' + this.resetScale + ')';
                  this.canvas.style.transform =  'scale(' + this.resetScale + ',' + this.resetScale + ')';
                }

      }
  } else {
        console.log('intitial canvas resize ');
        if (this.screenRatio > 0.65 && window.innerWidth <= 360) {
          // handles iphone 4 size screens, and awkward squat screens on android
          this.resetScale = this.smallScreenScale; // for reorient
          this.canvas.style.webkitTransform = 'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
          this.canvas.style.MozTransform = 'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
          this.canvas.style.msTransform = 'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
          this.canvas.style.OTransform = 'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
          this.canvas.style.transform =  'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
        } else if (this.screenRatio > 0.72) {
                this.canvas.style.webkitTransform = 'scale(' + this.scale + ',' + this.scale + ')';
                this.canvas.style.MozTransform = 'scale(' + this.scale + ',' + this.scale + ')';
                this.canvas.style.msTransform = 'scale(' + this.scale + ',' + this.scale + ')';
                this.canvas.style.OTransform = 'scale(' + this.scale + ',' + this.scale + ')';
                this.canvas.style.transform =  'scale(' + this.scale + ',' + this.scale + ')';
              } else {
                this.canvas.style.webkitTransform = 'scale(' + this.resetScale + ',' + this.resetScale + ')';
                this.canvas.style.MozTransform = 'scale(' + this.resetScale + ',' + this.resetScale + ')';
                this.canvas.style.msTransform = 'scale(' + this.resetScale + ',' + this.resetScale + ')';
                this.canvas.style.OTransform = 'scale(' + this.resetScale + ',' + this.resetScale + ')';
                this.canvas.style.transform =  'scale(' + this.resetScale + ',' + this.resetScale + ')';
              }
  }


  };

  window.addEventListener('resize', function(event) { this.resize(event); }.bind(this));
  window.addEventListener('orientationchange', function(event) { setTimeout(this.resize(event), 500); }.bind(this));


};


module.exports = new canvasSizer();
