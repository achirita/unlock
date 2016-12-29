//revealing module pattern
//returns an object literal which is singleton
var Game = (function () {
  "use strict";

  var stage;
  var view;
  var level = 0;
  var levelSettings = [{speed: 800, vertices: 5},
    {speed: 500, vertices: 5},
    {speed: 200, vertices: 5},
    {speed: 600, vertices: 6},
    {speed: 400, vertices: 6},
    {speed: 200, vertices: 6},
    {speed: 600, vertices: 7},
    {speed: 400, vertices: 7},
    {speed: 200, vertices: 7},
    {speed: 400, vertices: 8},
    {speed: 300, vertices: 8},
    {speed: 200, vertices: 8}];
  var viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
    center: {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    }
  };
  var options = {
    background: {
      color: "#FFE1A8"
    },
    logo: {
      text: "unlock",
      color: "#472D30",
      size: "15%",
      offsetX: "0%",
      offsetY: "-20%"
    },
    playButton: {
      width: "25%",
      height: "8%",
      radius: "4%", //radius should be half of height
      backgroundColor: "#E26D5C",
      text: "Play",
      fontSize: "5%",
      fontColor: "#FFE1A8"
    },
    endGame: {
      backgroundColor: "#A4A4A4",
      result: {
        win: {
          text: "Awesome!"
        },
        loss: {
          text: "Ooppss..."
        },
        fontSize: "15%",
        fontColor: "#E26D5C",
        offsetX: "0%",
        offsetY: "-20%"
      },
      nextLevel: {
        text: "Next level: ",
        fontSize: "5%",
        fontColor: "#472D30"
      }
    },
    circle: {
      color: "#E26D5C",
      radius: "5%"
    },
    connector: {
      color: "#E26D5C",
      thickness: "2%"
    },
    polygon: {
      radius: "40%",
    }
  };

  var initialize = function(canvas) {
    //create stage element using the canvas
		stage = new createjs.Stage(canvas);
		//update canvas size to fit the page
		stage.canvas.width = viewport.width;
		stage.canvas.height = viewport.height;
		//enable drag and drop functionality
		stage.enableMouseOver(10);
		//keep tracking the mouse even when it leaves the canvas
		stage.mouseMoveOutside = true;
		//enable touch
		createjs.Touch.enable(stage);
		//specify that ticker should use requestAnimationFrame
		createjs.Ticker.timingMode = createjs.Ticker.RAF;
		//start timer that updates stage
		createjs.Ticker.on("tick", update);
    //convert percentages to pixel values
    convertPercentages(options);
  };

  var update = function() {
    //if there's a view present update the stage
    if(view) {
      stage.update();
    }
  };

  var changeView = function() {
    var nextView = arguments[0];
    var data = arguments[1];
    //if there's a view present make sure it gets destroyed before switching
    if(view) {
      view.destroy();
    }
    view = nextView;
    view.initialize(stage, data);
  };

  //recursively go through the object's properties and convert those that end with %
  var convertPercentages = function(object) {
    for (var key in object) {
      if(typeof object[key] === "object") {
        convertPercentages(object[key]);
      } else {
        if(typeof object[key] === "string" && object[key].endsWith("%")) {
          object[key] = Utils.getRelativeSize(object[key], Game.viewport);
        }
      }
    }
  }

  return {
    level: level,
    levelSettings: levelSettings,
    viewport: viewport,
    options: options,
    initialize: initialize,
    changeView: changeView
  };

})();
