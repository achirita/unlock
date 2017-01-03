var ShowPattern = (function (viewport, options) {
  "use strict";

  var stage;

  var initialize = function() {
    stage = arguments[0];
    var tweens = [];

    //create background
		stage.addChild(Utils.createjs.createRectangle(0, 0, viewport.width, viewport.height, options.background.color));

    //the number of vertices depends on the current level
    var vertices = Game.levelSettings[Game.level].vertices;
    //ceate a circle for each polygon vertex and add it to stage
    var vertices = Utils.getPolygonVertices(viewport.center, options.polygon.radius, vertices);
    for(var i = 0; i < vertices.length; i++) {
      stage.addChild(Utils.createjs.createCircle(vertices[i], options.circle.radius, options.circle.color));
    }

    //create middle circle and add it to stage
    var finger = Utils.createjs.createCircle(viewport.center, options.circle.radius, options.circle.color);
    stage.addChild(finger);

    //create a new shape representing the line that is drawn between the circles
    var connector = new createjs.Shape();
    connector.graphics.setStrokeStyle(options.connector.thickness, "round")
      .beginStroke(options.connector.color);
    stage.addChild(connector);

    //shuffle the vertices in order to get random patterns
    Utils.shuffleArray(vertices);

    //add the center point to the vertices array in order to generate the tweens easier
    vertices.unshift(viewport.center);

    //the speed depends on the current level
    var speed = Game.levelSettings[Game.level].speed;
    //generate tweens
    var command;
    for(var i = 0; i < vertices.length - 1; i++) {
      command = connector.graphics.moveTo(vertices[i].x, vertices[i].y)
        .lineTo(vertices[i].x, vertices[i].y)
        .command;
      tweens.push(createjs.Tween.get(command, {paused: true}).to({x: vertices[i + 1].x, y: vertices[i + 1].y}, speed));
    }

    //done generating tweens, remove the center point from the vertices array
    vertices.shift();

    //each tween will trigger the next one
		for(var i = 0; i < tweens.length; i++) {
			tweens[i].play(tweens[i + 1]);
		}

    //the last tween will trigger the transition to the next scene
    tweens.pop().call(function() {
      Game.changeView(DoPattern, vertices);
    });

    tweens[0].setPaused(false);
  };

  var destroy = function() {
    stage.removeAllChildren();
    stage = null;
  };

  return {
    initialize: initialize,
    destroy: destroy
  };

})(Game.viewport, Game.options);
