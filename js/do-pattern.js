var DoPattern = (function (viewport, options) {
  "use strict";

  var stage;
  var circles = [];
  var connector;
  var connections = [];

  var initialize = function() {
    stage = arguments[0];
    var vertices = arguments[1];

    //create background
    stage.addChild(Utils.createjs.createRectangle(0, 0, viewport.width, viewport.height, options.background.color));

    //ceate a circle for each polygon vertex and add it to stage
    for(var i = 0; i < vertices.length; i++) {
      var circle = Utils.createjs.createCircle(vertices[i], options.circle.radius, options.circle.color);
      circles.push(circle);
      stage.addChild(circle);
    }

    //create a new shape representing the line that is drawn between the circles
    connector = new createjs.Shape();
    stage.addChild(connector);

    //create middle circle and add it to stage
    var finger = Utils.createjs.createCircle(viewport.center, options.circle.radius, options.circle.color);
    finger.on("pressmove", dragFinger);
    finger.on("pressup", liftFinger);
    stage.addChild(finger);

    //add the center as the first connectionBar
    connections.push(viewport.center);
  };

  var dragFinger = function(event) {
    //update position
    event.currentTarget.x = event.stageX;
    event.currentTarget.y = event.stageY;

    //check if the finger overlapps one of the circles
    for(var i = 0; i < circles.length; i++) {
      if(hitTest(event.currentTarget, circles[i])) {
        //if it does, check if that circle was previously touched
        if (connections.indexOf(circles[i]) === -1) {
          connections.push(circles[i]);
        }
      }
    }

    //clear old connectionBar graphics
    connector.graphics.clear();

    //draw line between all connected circles
    var len = connections.length;
    for(var i = 0; i < len - 1; i++) {
      Utils.createjs.drawLine(connector, connections[i], connections[i + 1], options.connector.thickness, options.connector.color);
    }

    //draw line between last connected circle to the current touch position
    var endPoint = {
      x: event.stageX,
      y: event.stageY
    };

    Utils.createjs.drawLine(connector, connections[len - 1], endPoint, options.connector.thickness, options.connector.color);
  };

  //check if the circles were touched in the right order
  //connections and circles should contain the same objects in the same positions
  var liftFinger = function(event) {
    //remove the first element of connections which was the screen center
    connections.shift();

    //compare the arrays
    var result = true;
    for(var i = 0; i < circles.length; i++) {
      if(circles[i] !== connections[i]) {
        result = false;
      }
    }

    Game.changeView(EndGame, result);
  };

  //check if two circles are are overlapping
  var hitTest = function(source, target) {
    var sourceRadius = source.radius;
    var targetRadius = target.radius;
    var minDist = sourceRadius + targetRadius;
    var distBetweenCenters = Math.sqrt((source.x - target.x) * (source.x - target.x) + (source.y - target.y) * (source.y - target.y));
    return distBetweenCenters < minDist;
  };

  var destroy = function() {
    stage.removeAllChildren();
    stage = null;
    circles = [];
    connector = null;
    connections = [];
  };

  return {
    initialize: initialize,
    destroy: destroy
  };

})(Game.viewport, Game.options);
