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
