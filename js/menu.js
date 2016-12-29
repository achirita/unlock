var Menu = (function(viewport, options) {
	"use strict";

	var stage;

	var initialize = function() {
		stage = arguments[0];

		//create background
		stage.addChild(Utils.createjs.createRectangle(0, 0, viewport.width, viewport.height, options.background.color));

		//calculate logo position relative to the center of the screen
		var logoPosition = {
			x: viewport.center.x + options.logo.offsetX,
			y: viewport.center.y + options.logo.offsetY
		};

		//create text logo
		var logo = Utils.createjs.createCenteredText(options.logo.text,
			options.logo.size + "px Nunito",
			options.logo.color,
			logoPosition);
		stage.addChild(logo);

		//create play button
		var playButton = Utils.createjs.createCenteredRoundButton(viewport.center,
      options.playButton.width,
      options.playButton.height,
      options.playButton.radius,
			options.playButton.backgroundColor,
      options.playButton.text,
      options.playButton.fontSize + "px Nunito",
      options.playButton.fontColor);

		playButton.on("click", function() {
			Game.changeView(ShowPattern);
		});
		stage.addChild(playButton);

		//create animated lines
    var line = new createjs.Shape();
		line.graphics.setStrokeStyle(options.connector.thickness, "round")
			.beginStroke(options.connector.color);
    stage.addChild(line);

		var x1 = viewport.width;
		var y1 = 0.6 * viewport.height;
		var x2 = 0;
		var y2 = 0.9 * viewport.height;

		var command = line.graphics.moveTo(x1, y1)
			.lineTo(x1, y1)
			.command;
		var t1 = createjs.Tween.get(command, {paused: true}).to({x: x2, y: y2}, 3000);

		x1 = 0.6 * viewport.width;
		y1 = -100;
		x2 = viewport.width;
		y2 = 0.8 * viewport.height;

		command = line.graphics.moveTo(x1, y1)
			.lineTo(x1, y1)
			.command;
		var t2 = createjs.Tween.get(command, {paused: true}).to({x: x2, y: y2}, 3000);
		t1.play(t2);
		t1.setPaused(false);
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
