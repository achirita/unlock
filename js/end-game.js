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
      displayText = options.endGame.result.win.text;
			if(Game.level < Game.levelSettings.length - 1) {
				Game.level++;
			}
    } else {
      displayText = options.endGame.result.loss.text;
			if(Game.level > 0) {
				Game.level--;
			}
    }

		var resultTextPosition = {
			x: viewport.center.x + options.endGame.result.offsetX,
			y: viewport.center.y + options.endGame.result.offsetY
		};

    var resultText = Utils.createjs.createCenteredText(displayText,
      options.endGame.result.fontSize + "px Nunito",
      options.endGame.result.fontColor,
      resultTextPosition);
    stage.addChild(resultText);

		var nextLevelText = Utils.createjs.createCenteredText(options.endGame.nextLevel.text + (Game.level + 1),
      options.endGame.nextLevel.fontSize + "px Nunito",
      options.endGame.nextLevel.fontColor,
      viewport.center);
    stage.addChild(nextLevelText);
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
