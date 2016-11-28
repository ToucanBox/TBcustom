//canvasSizer

 window.addEventListener('resize', canvasSizer);

function canvasSizer() {
    var height = window.innerHeight;
    var width = window.innerWidth;
    var canvas = document.getElementById('canvas-main');

    var intendedHeight = height - 180;

    var scale = intendedHeight/720;

    var screenRatio = width/height;

    if (screenRatio > 1) {
      console.log('resize');
      canvas.style.webkitTransform = 'scale(' + scale + ',' + scale + ')';
      canvas.style.MozTransform = 'scale(' + scale + ',' + scale + ')';
      canvas.style.msTransform = 'scale(' + scale + ',' + scale + ')';
      canvas.style.OTransform = 'scale(' + scale + ',' + scale + ')';
      canvas.style.transform =  'scale(' + scale + ',' + scale + ')';
    }

    var smallScreenScale = 0.78;

    if (screenRatio > 0.65 && width <= 320) {
      console.log('resize2');
      canvas.style.webkitTransform = 'scale(' + smallScreenScale + ',' + smallScreenScale + ')';
      canvas.style.MozTransform = 'scale(' + smallScreenScale + ',' + smallScreenScale + ')';
      canvas.style.msTransform = 'scale(' + smallScreenScale + ',' + smallScreenScale + ')';
      canvas.style.OTransform = 'scale(' + smallScreenScale + ',' + smallScreenScale + ')';
      canvas.style.transform =  'scale(' + smallScreenScale + ',' + smallScreenScale + ')';
    }



 }

 canvasSizer();
