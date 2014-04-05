/** @jsx React.DOM */

var React = require('react');
var Config = require('./Config');
var HorizontalRulerTick = require('./HorizontalRulerTick');


var HorizontalRuler = React.createClass({

	render: function() {
		var style = {
			'boxSizing': 'border-box',
			'position': 'fixed',
			'top' : 0,
			'left': 0,
			'zIndex': Config.zIndex + 1,
			'width': '100%',
			'height': Config.rulerThickness,
			'boxShadow': 'rgba(211,211,211,0.5) 0px 0px 5px 2px',
			'overflow': 'hidden',
			'backgroundColor': Config.rulerBackgroundColor,
			'borderBottom': '1px solid',
			'borderColor' : Config.rulerStrokeColor
		};

		// rendering ticks
		var ticks = generateHorizontalRulerTicks(1000);

		return this.transferPropsTo(
			<div style={ style }>
				{ ticks }
			</div>
		);
	}

});

function generateHorizontalRulerTicks(max) {
	// return a array of max-number HorizontalRulerTick
	var ticks = [];
	var thickness = Config.rulerThickness;
	var top;

	for (var i = 0; i < max; i++) {
		switch (i % 10) {
			case 0:
				// if 10th tick
				top = 0; break;
			case 5:
				// if 5th tick
				top = Math.round(thickness / 2); break;
			default:
				// if normal tick
				top = Math.round(thickness * 3 / 4);
		}

		ticks.push(
			<HorizontalRulerTick left={ i* 10 } top={ top } />
		);
	}

	return ticks;
}

module.exports = HorizontalRuler;
