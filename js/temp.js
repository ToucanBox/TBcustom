
// original vars

var count = 0;
var othercount = 0;
var dir = {a:1,b:1,c:1,d:0};
var points = [];
var g, ropeLength, strip, items;







var spriteNames = [];
var frames = [];

// 'Magically works' 4 is number of sprites, Pixi 'knows' cached the sprite names and what they relate to
// Might need to support multiple sprite sheets

for (var i = 1; i < 8; i++) {
  spriteNames.push('b' + i + '.png');
  console.log(spriteNames[i]);
  frames.push(PIXI.Texture.fromFrame('b' + i + '.png'));
}

// Add all icons to tray

var icons = document.getElementById('icons');

for (var i = 0; i < spriteNames.length; i++) {
  var node = document.createElement("li");
  node.className = 'js_slide spritesheet sprite' + i;
  node.id = i;
  node.addEventListener('click',onClick,false);
  icons.appendChild(node);
}

// Add slider

var multiSlides = document.querySelector('.js_slider');

lory(multiSlides, {
    infinite: 0,
    slidesToScroll: 1,
    rewind: true
});

// TEST SPRITES
for (var i = 0; i < items.length; i++) {
  stage.addChild(items[i]);
}

makeRope();
makeG();




  function makeRope() {
    // build a rope!
    ropeLength = 918 / 22;

    for (var i = 0; i < 20; i++)
    {
        points.push(new PIXI.Point(i * ropeLength, null));
    }

    strip = new PIXI.mesh.Rope(PIXI.Texture.fromImage('img/Path_1.png'), points);

    // Makeinitial bend
    for (var i = 0; i < points.length; i++) {

          points[i].y = Math.pow( i, 2);
    }

    strip.position.x = 10;
    strip.position.y = 200;

    strip.interactive = true;
    strip.on('mousedown', animatePoints);
    strip.on('touchstart', animatePoints);

    stage.addChild(strip);
  }

  function makeG() {

    g = new PIXI.Graphics();

    g.x = strip.x;
    g.y = strip.y;
    stage.addChild(g);

  }

  function animateArm(count) {
    for (var i = 1; i < points.length; i++) {

        points[0].y = 0;
        points[0].x = 0;

        points[i].y = Math.pow( i, 2 ) + Math.sin((i * 0.05) + count) * (i * 2);
        points[i].x = i * ropeLength - Math.pow( i, 2 * Math.sin(count));

         // points[i].x = (ropeLength * i) - i * (ropeLength/2);
        // points[i].x = i * ropeLength + Math.cos((i * 0.3) + count) * 20;
    }
  }

  function animateArm2(count) {
    for (var i = 1; i < points.length; i++) {

        points[0].y = 0;
        points[0].x = 0;

        points[i].y = dir.a * Math.pow( i, dir.c * 2 ) - Math.sin((i * 0.05) + count) * (i * 2);
        points[i].x = i * ropeLength - Math.pow( i, 2.1 * dir.b) - dir.d * Math.pow( i , 2 );

    }
  }

  function renderPoints() {

      g.clear();

      g.lineStyle(2,0xff0022);
      g.moveTo(points[0].x,points[0].y);

      for (var i = 1; i < points.length; i++) {
          g.lineTo(points[i].x,points[i].y);
      };

      for (var i = 1; i < points.length; i++) {
          g.beginFill(0xff0022);
          g.drawCircle(points[i].x,points[i].y,10);
          g.endFill();
      };
  }


  function animatePoints() {

    var animePointsA = anime({
    targets: dir,
    a: -1,
    b: -1,
    d: 1,
    autoplay: false,
    duration: 2000,
    complete: function() {
      var animePointsB = anime({
      targets: dir,
      a: 1,
      b: 1,
      d: 0,
      duration: 500,
      delay: 200,
      easing: 'easeOutQuint'
      });
    }
  });

    animePointsA.play();

  }
