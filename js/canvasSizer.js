//canvasSizer

var canvasSizer = function () {

  this.canvas = document.getElementById('canvas-main');

  this.socialBtns = document.getElementById('social-container');

  this.logo = document.querySelector('.logo');

  this.resize = function(event) {

    if (window.innerWidth >= 700  ) {
      this.socialBtns.style.display = 'block';

      // Share container position
      this.socialBtns.style.top = window.innerHeight / 2 - 105 - 100 + 'px';

    } else {
      this.socialBtns.style.display = 'none';
    }

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

    if (660 >= window.innerHeight) {
      this.logo.style.visibility = 'hidden';
    } else {
      this.logo.style.visibility = 'visible';
    }

    this.intendedHeight = window.innerHeight - 180;

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

          if (this.screenRatio > 0.65 && window.innerWidth <= 320) {
            // handles iphone 4 size screens
            this.resetScale = this.smallScreenScale; // for reorient
            this.canvas.style.webkitTransform = 'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
            this.canvas.style.MozTransform = 'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
            this.canvas.style.msTransform = 'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
            this.canvas.style.OTransform = 'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
            this.canvas.style.transform =  'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
          } else if (this.screenRatio > 0.7) {
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
        if (this.screenRatio > 0.65 && window.innerWidth <= 320) {
          // handles iphone 4 size screens
          this.resetScale = this.smallScreenScale; // for reorient
          this.canvas.style.webkitTransform = 'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
          this.canvas.style.MozTransform = 'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
          this.canvas.style.msTransform = 'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
          this.canvas.style.OTransform = 'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
          this.canvas.style.transform =  'scale(' + this.smallScreenScale + ',' + this.smallScreenScale + ')';
        } else if (this.screenRatio > 0.7) {
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
