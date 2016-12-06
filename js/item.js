// Make items

var anime = require('animejs');

var item = function (id, image, type, viewport) {
    this.id = id;
    this.type = type;
    this.image = image;
    console.log('new item added ID:' + this.id + ', type: ' + this.type);
    PIXI.Sprite.call(this, image);
    this.interactive = true;
    this.buttonMode = true;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    if (this.type === 'FaceLayer' || this.type === 'Glasses'){
      this.position.x = anime.random(-200, 200);
      this.position.y = anime.random(-280, 280);
    } else {
      this.position.x = anime.random(180, 340);
      this.position.y = anime.random(140, 540);
    }

    // if ID is makes this draggable then ... TODO

    if (id === '40') {
      this.position.x = viewport.width / 2 - 4;
      this.position.y = viewport.height / 2 + 163;
    } else if (id === '5') {
      this.position.x = viewport.width / 2 + 8;
      this.position.y = viewport.height / 2 + 128;
    } else if (id === '32') {
      this.position.x = viewport.width / 2 + 1;
      this.position.y = viewport.height / 2 + 119;
      this.scale.x = 1.01;
      // this.rotation = 0.02;
    } else if (id === '7') {
      this.position.x = viewport.width / 2 - 4;
      this.position.y = viewport.height / 2 + 119;
    } else if (id === '45') {
      this.position.x = viewport.width / 2 - 4;
      this.position.y = viewport.height / 2 + 119;
    } else {
      // hit area
      // make based on height or width, whichever is smallest? TODO
      if (this.height >= this.width) {
        this.hitSizer = this.width / 2;
      } else {
        this.hitSizer = this.height / 1.2;
      }
      this.hitArea = new PIXI.Circle(0.5, 0.5, this.hitSizer);
      this.visualHit = new PIXI.Circle(0.5, 0.5, this.hitSizer); // could be different from actual hitArea in the future?
      this.drawHit = new PIXI.Graphics();
      this.drawHit.beginFill(0xffd900);
      this.drawHit.drawShape(this.visualHit);
      this.drawHit.alpha = 0.5;
      this.addChild(this.drawHit);

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
  };

  item.prototype = Object.create(PIXI.Sprite.prototype);
  item.prototype.constructor = item;

  item.prototype.onDragStart = function(event) {
      // Need to include touch control - handle multitouch TODO
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

      // remove items if outside bounds TODO
      // show edge if dragging outside bounds TODO
    }
  };

  item.prototype.onDragMove = function(event) {
      if (this.dragging)
      {
          var newPosition = this.data.getLocalPosition(this.parent);
          this.position.x = newPosition.x - this.dragPoint.x;
          this.position.y = newPosition.y - this.dragPoint.y;

          // stars particle effect TODO
      }
  };

  item.prototype.animate = function(event) {
      if (this.dragging)
      {
          //announce with pop TODO
          //wiggling until first drag and release, maybe text 'put me somewhere' TODO
      }

      // occasionally fade in drag targets TODO

      // if id=13, googly eyes, rotate

      requestAnimationFrame(this.animate.bind(this));
  };




module.exports = item;
