var Menu = (function(level, speed, viewport, options) {
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

	};

	var destroy = function() {
		stage.removeAllChildren();
		stage = null;
	};

	return {
		initialize: initialize,
		destroy: destroy
	};

})(Game.level, Game.speed, Game.viewport, Game.options);
