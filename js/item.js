// Make items

var item = function (id, image, route) {
    this.routeContainer = route;
    this.id = id;
    this.image = image;
    console.log('new item added ID:' + this.id);
    PIXI.Sprite.call(this, image);
    this.interactive = true;
    this.buttonMode = true;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.position.x = 200;
    this.position.y = 400;

    // hit area
    this.hitSizer = this.height/3;
    this.hitArea = new PIXI.Circle(0.5, 0.5, this.hitSizer);
    this.visualHit = new PIXI.Circle(0.5, 0.5, this.hitSizer);
    this.drawHit = new PIXI.Graphics();
    this.drawHit.beginFill(0xffd900);
    this.drawHit.drawShape(this.visualHit);
    this.drawHit.alpha = 0.5;
    this.addChild(this.drawHit);

    // if clothes or shoes then static, appears in place, removes other clothes, shoes TODO
    // hair is draggable but removes other hair TODO
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
      this.scale.x *= 1.1;
      this.scale.y *= 1.1;
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
      this.scale.x /= 1.1;
      this.scale.y /= 1.1;
      // set the interaction data to null
      this.data = null;
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

      requestAnimationFrame(this.animate.bind(this));
  };



module.exports = item;
