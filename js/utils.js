Utils = {
	createjs: {
		createCircle: function(center, radius, color) {
			var circle = new createjs.Shape();
			circle.graphics.beginFill(color)
				.drawCircle(0, 0, radius)
				.endFill();
			circle.x = center.x;
			circle.y = center.y;
			//createjs.Shape does not contain a radius property
			//we'll add this because it will be needed later
			circle.radius = radius;
			return circle;
		},

		createRectangle: function(x, y, width, height, color) {
			var rectangle = new createjs.Shape();
			rectangle.graphics.beginFill(color)
				.drawRect(x, y, width, height)
				.endFill();
			return rectangle;
		},

		drawLine: function(shape, from, to, thickness, color) {
			shape.graphics.setStrokeStyle(thickness, "round")
        .beginStroke(color)
        .moveTo(from.x, from.y)
        .lineTo(to.x, to.y)
        .endStroke();
		},

		createCenteredText: function(text, font, color, center) {
			var t = new createjs.Text(text, font, color);
			t.textAlign = 'center';
			t.textBaseline = 'middle';
			t.x = center.x;
			t.y = center.y;
			return t;
		},

		createCenteredRoundButton: function(center, width, height, radius, color, text, font, fontColor) {
			var button = new createjs.Container();
			var roundRectangle = new createjs.Shape();
			roundRectangle.graphics.beginFill(color)
				.drawRoundRect(center.x - width / 2, center.y - height / 2, width, height, radius)
				.endFill();
			var text = new createjs.Text(text, font, fontColor);
			text.x = center.x;
			text.y = center.y;
			text.textAlign = 'center';
			text.textBaseline = 'middle';
			button.addChild(roundRectangle, text);
			return button;
		}
	},

	//generate the vertices of a polygon
	getPolygonVertices: function(center, radius, sides) {
		var polyPoints = [];
		var angle = 2 * Math.PI / sides;
		for (var i = 0; i < sides; i++) {
			polyPoints.push(
				new createjs.Point(center.x + radius * Math.sin(i * angle),
					center.y + radius * Math.cos(i * angle))
			);
		}
		return polyPoints;
	},

	//shuffle an array in place
	//returns the shuffled array for convenience
	shuffleArray: function(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	},

	getRelativeSize: function(percentage, viewport) {
		return this.parsePercentage(percentage) * Math.min(viewport.width, viewport.height);
	},

	/*
	parsePercentage("5%") = 0.05
	parsePercentage("5.1%") = 0.051
	parsePercentage(".2%") = 0.002
	parsePercentage("7.%") = 0.07
	*/
	parsePercentage: function(percentage) {
		if (typeof percentage === "string") {
			var p = parseFloat(percentage);
			if (!isNaN(p)) {
				return p / 100;
			} else {
				throw "Unable to convert.";
			}
		} else {
			throw "Invalid argument.";
		}
	}

};
