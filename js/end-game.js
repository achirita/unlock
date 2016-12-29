var EndGame = (function(viewport, options) {
	"use strict";

  var stage;

	var initialize = function() {
    stage = arguments[0];
    var result = arguments[1];

    //create background
    var background = Utils.createjs.createRectangle(0, 0, viewport.width, viewport.height, options.background.color);
    background.on("click", function() {
      Game.changeView(ShowPattern);
    });
    stage.addChild(background);

    var displayText;
    if(result) {
      displayText = options.endGame.winText;
			if(Game.level < Game.levelSettings.length - 1) {
				Game.level++;
			}
    } else {
      displayText = options.endGame.lossText;
			if(Game.level > 0) {
				Game.level--;
			}
    }

    var text = Utils.createjs.createCenteredText(displayText,
      options.endGame.fontSize + "px Nunito",
      options.endGame.fontColor,
      viewport.center);
    stage.addChild(text);
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
