//canvasSizer

 window.addEventListener('resize', canvasSizer);

function canvasSizer() {
    var height = window.innerHeight;
    var width = window.innerWidth;
    var canvas = document.getElementById('canvas-main');

    // Share container position
    var socialBtns = document.getElementById('social-container');
    socialBtns.style.top = height / 2 - 105 - 65 + 'px';

    var intendedHeight = height - 180;

    var scale = intendedHeight/720;

    var screenRatio = width/height;

    if (screenRatio > 1) {
      canvas.style.webkitTransform = 'scale(' + scale + ',' + scale + ')';
      canvas.style.MozTransform = 'scale(' + scale + ',' + scale + ')';
      canvas.style.msTransform = 'scale(' + scale + ',' + scale + ')';
      canvas.style.OTransform = 'scale(' + scale + ',' + scale + ')';
      canvas.style.transform =  'scale(' + scale + ',' + scale + ')';
    }

    var smallScreenScale = 0.78;

    if (screenRatio > 0.65 && width <= 320) {
      canvas.style.webkitTransform = 'scale(' + smallScreenScale + ',' + smallScreenScale + ')';
      canvas.style.MozTransform = 'scale(' + smallScreenScale + ',' + smallScreenScale + ')';
      canvas.style.msTransform = 'scale(' + smallScreenScale + ',' + smallScreenScale + ')';
      canvas.style.OTransform = 'scale(' + smallScreenScale + ',' + smallScreenScale + ')';
      canvas.style.transform =  'scale(' + smallScreenScale + ',' + smallScreenScale + ')';
    }

    console.log('resize');

 }

 canvasSizer();
