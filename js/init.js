// init

var item = require('/Users/anthonymoles/Documents/TBcustom/js/item.js');

var init = function () {
  this.itemTextures = [];
  this.armsTextures = [];
  this.bodyTextures = [];

  var self = this;

  this.onClick = function(event) {
    var id = event.target.id;
    console.log(id);
    var index = id - 1;

  // ADD ITEM
    var image = self.itemTextures[index];
    console.log(image);
    var add = new item(id, image);
    // WHY CANT I ACCESS THIS GLOBAL?
    window.viewport.addChild(add);
    console.log(add);
  };

};

init.prototype.loadTextures = function () {
  var i;

  for (i = 1; i <= 61; i++)
    {
       var texture = PIXI.Texture.fromFrame( i + '.png' );
       this.itemTextures.push(texture);
    }

  for (i = 1; i <= 5; i++)
    {
      var textureBody = PIXI.Texture.fromFrame( 'a' + i + '.png' );
      this.armsTextures.push(textureBody);
    }

  for (i = 1; i <= 8; i++)
    {
      var textureArm = PIXI.Texture.fromFrame( 'b' + i + '.png' );
      this.bodyTextures.push(textureArm);
    }
};

init.prototype.populatePalette = function () {
  var i;

  var icons = document.getElementById('icons');

  for (i = 1; i <= 61; i++) {
    var node = document.createElement("li");
    node.className = 'js_slide sprite-icons icons-' + i;
    node.id = i;
    node.addEventListener( 'click' , this.onClick.bind(this) , false );
    icons.appendChild( node );
  }

};

init.prototype.initSlider = function () {

  var multiSlides = document.querySelector('.slider');

  // different behaviour on wider screens - scroll more slides. if/else statement
  lory(multiSlides, {
      infinite: 0,
      enableMouseEvents: true,
      slidesToScroll: 3,
      rewind: true
  });


};

module.exports = new init();
