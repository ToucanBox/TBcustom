// Make items

var anime = require('animejs');

var item = function (id, image, type, cWidth, cHeight, touchX, touchY) {

    this.id = id;
    this.type = type;
    this.image = image;
    console.log('new item added ID:' + this.id + ', type: ' + this.type);
    PIXI.Sprite.call(this, image);
    this.wiggle = false;
    this.interactive = true;
    this.buttonMode = true;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.scale.x = 1;
    this.scale.y = 1;

    if (touchX > 600 || touchX < 0) {
      this.position.x = cWidth / 2;
    } else {
      this.position.x = touchX;
    }

    if (touchY > 780 || touchY < 100) {
      this.position.y = cHeight / 2;
    } else {
      this.position.y = touchY;
    }
    this.anchors = true;

    this.count = 0;

    // if ID is makes this non-draggable then

    if (id === '40') {
      this.position.x = cWidth / 2 - 4;
      this.position.y = cHeight / 2 + 163;
    } else if (id === '5') {
      this.position.x = cWidth / 2 + 8;
      this.position.y = cHeight / 2 + 128;
    } else if (id === '32') {
      this.position.x = cWidth / 2 + 1;
      this.position.y = cHeight / 2 + 119;
      this.scale.x = 1.01;
      // this.rotation = 0.02;
    } else if (id === '7') {
      this.position.x = cWidth / 2 - 4;
      this.position.y = cHeight / 2 + 119;
    } else if (id === '45') {
      this.position.x = cWidth / 2 - 4;
      this.position.y = cHeight / 2 + 119;
    } else {
      // hit area
      if (type === 'Shoes') {
        this.hitSizerY = this.height / 1.6;
        this.hitSizerX = this.width / 2;
        this.hitArea = new PIXI.Ellipse(0.5, 0.5, this.hitSizerX, this.hitSizerY);
        this.visualHit = new PIXI.Ellipse(0.5, 0.5, this.hitSizerX, this.hitSizerY);
        this.drawHit = new PIXI.Graphics();
        this.drawHit.beginFill(0xFFE448);
        this.drawHit.drawShape(this.visualHit);
        this.drawHit.alpha = 0;
        this.addChild(this.drawHit);

      } else {
        if (this.width > 100) {
          this.hitSizer = 80;
        }
        else if (this.width > 80 && this.height > 80) {
          this.hitSizer = this.width / 2.5;
        } else {
          this.hitSizer = 40;
        }
        this.hitArea = new PIXI.Circle(0.5, 0.5, this.hitSizer);
        this.visualHit = new PIXI.Circle(0.5, 0.5, this.hitSizer);
        this.drawHit = new PIXI.Graphics();
        this.drawHit.beginFill(0xFFE448);
        this.drawHit.drawShape(this.visualHit);
        this.drawHit.alpha = 0;
        this.addChild(this.drawHit);

    }

      this
      // events for drag start
      .on('mousedown', this.onDragStart.bind(this))
      .on('touchstart', this.onDragStart.bind(this))
      // events for drag end
      .on('mouseup', this.onDragEnd.bind(this))
      .on('mouseupoutside', this.onDragEnd.bind(this))
      .on('touchend', this.onDragEnd.bind(this))
      .on('touchendoutside', this.onDragEnd.bind(this))
      // events for drag move
      .on('mousemove', this.onDragMove.bind(this))
      .on('touchmove', this.onDragMove.bind(this));
    }


    requestAnimationFrame(this.animate.bind(this));
    this.fadeHit();
  };

  item.prototype = Object.create(PIXI.Sprite.prototype);
  item.prototype.constructor = item;

  item.prototype.removeAnchor = function() {
    this.removeChild(this.drawHit);
  };

  item.prototype.restoreAnchor = function() {
    this.addChild(this.drawHit);
  };

  item.prototype.onDragStart = function(event) {
      // Need to include touch control - handle multitouch
      // store a reference to the data
      // the reason for this is because of multitouch
      // we want to track the movement of this particular touch
      if (!this.dragging) {
      this.data = event.data;
      this.alpha = 0.5;
      this.dragging = true;
      this.scale.x *= 1.05;
      this.scale.y *= 1.05;
      this.dragPoint = event.data.getLocalPosition(this.parent);
      this.dragPoint.x -= this.position.x;
      this.dragPoint.y -= this.position.y;
      var parent = this.parent;
      parent.removeChild(this);
      parent.addChild(this);
    }
  };

  item.prototype.onDragEnd = function(event) {
    if (this.dragging) {
      this.alpha = 1;
      this.dragging = false;
      this.scale.x /= 1.05;
      this.scale.y /= 1.05;
      // set the interaction data to null on end
      this.data = null;

      this.rotation = 0;

      if (this.position.x >= 560 || this.position.x <= 40) {
        this.destroy();
      }

      if (this.position.y >= 760 || this.position.y <= 40) {
        this.destroy();
      }

    }
  };

  item.prototype.onDragMove = function(event) {
      if (this.dragging)
      {
          var newPosition = this.data.getLocalPosition(this.parent);
          this.position.x = newPosition.x - this.dragPoint.x;
          this.position.y = newPosition.y - this.dragPoint.y;

          // if (this.position.x >= 560 || this.position.x <= 40) {
          //   this.drawHit.beginFill(0xff393a);
          //   this.drawHit.alpha = 0.05;
          //   this.drawHit.drawShape(this.visualHit);
          // }
          //
          // if (this.position.y >= 760 || this.position.y <= 40) {
          //   this.drawHit.beginFill(0xff393a);
          //   this.drawHit.alpha = 0.05;
          //   this.drawHit.drawShape(this.visualHit);          }

          // stars particle effect TODO
      }
  };

  item.prototype.animate = function(event) {
      this.count += 0.01;
      if (this.dragging)
      {
          //wiggling until first drag and release, maybe text 'put me somewhere'
          this.rotation = 0.05 * Math.sin(20 * this.count);
      }

      if (!this.dragging && this.anchors)
      {
        // occasionally fade in drag targets
        // if (this.type !== 'Clothes' && this.type !== 'Low Accessories' ) {
        // this.drawHit.alpha = 0 - 0.5 * Math.sin(2 * this.count);
        // }
    }

      // if id=13, googly eyes, rotate
      if (this.id === '13') {
        this.rotation = 2 * this.count;
      }

      requestAnimationFrame(this.animate.bind(this));
  };

  item.prototype.startIntro = function() {

  this.scale.x = 0;
  this.scale.y = 0;

  this.intro = anime({
  targets: this.scale,
  x: 1,
  y: 1,
  duration: 1000,
  autoplay: false
  });

  this.intro.play();

};

item.prototype.fadeHit = function() {
  this.fader = anime({
  targets: this.drawHit,
  alpha: 0.5,
  duration: 1000,
  autoplay: true,
  delay: 3000,
  easing: 'easeInOutQuad',
  direction: 'alternate',
  loop: true
  });
};




module.exports = item;
