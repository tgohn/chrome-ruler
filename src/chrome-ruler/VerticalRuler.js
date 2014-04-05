/** @jsx React.DOM */

var React = require('react');
var Config = require('./Config');
var VerticalRulerTick = require('./VerticalRulerTick');


var VerticalRuler = React.createClass({

	render: function() {
		var style = {
			'boxSizing': 'border-box',
			'position': 'fixed',
			'top' : 0,
			'left': 0,
			'zIndex': Config.zIndex + 1,
			'height': '100%',
			'width': Config.rulerThickness,
			'boxShadow': 'rgba(211,211,211,0.5) 0px 0px 5px 2px',
			'overflow': 'hidden',
			'backgroundColor': Config.rulerBackgroundColor,
			'borderRight': '1px solid',
			'borderColor' : Config.rulerStrokeColor
		};

		// rendering ticks
		var ticks = generateVerticalRulerTicks(1000);

		return this.transferPropsTo(
			<div style={ style }>
				{ ticks }
			</div>
		);
	}

});

function generateVerticalRulerTicks(max) {
	// return a array of max-number HorizontalRulerTick
	var ticks = [];
	var thickness = Config.rulerThickness;
	var left;

	for (var i = 0; i < max; i++) {
		switch (i % 10) {
			case 0:
				// if 10th tick
				left = 0; break;
			case 5:
				// if 5th tick
				left = Math.round(thickness / 2); break;
			default:
				// if normal tick
				left = Math.round(thickness * 3 / 4);
		}

		ticks.push(
			<VerticalRulerTick top={ i* 10 } left={ left } />
		);
	}

	return ticks;
}

module.exports = VerticalRuler;
