/** @jsx React.DOM */

var React = require('react');
var Config = require('../Config.js');

var Text = React.createClass({
	render: function() {
		var pos = getPosition(this.props.start, this.props.end);
		var distance = getDistance(this.props.start, this.props.end);

		var style = {
			'position': 'absolute',
			'zIndex'  : '10005',
			'fontSize': '18px',
			'fontFamily': 'monospace',
			'fontWeight': '700',
			'backgroundColor': 'white',
			'color': '#333',
			'padding': '0.2em 0.4em',
			'boxShadow': '0 2px 3px 1px rgba(0,0,0,0.3)',
			'WebkitTransform': 'translateY(-100%) translateX(20px)',
			'left': pos.x,
			'top': pos.y
		};

		return (
			<div style={ style }>
				{ distance } px
			</div>
		)
	}
});

function getDistance(start, end) {
	var ox = start.x;
	var oy = start.y;
	var x = end.x;
	var y = end.y;

	var relX = !(x - ox) ?  0 : x-ox+1;
	var relY = !(y - oy) ?  0 : y-oy+1;

	var distance = Math.sqrt(
		Math.pow(relX,2) + Math.pow(relY, 2)
	);
	distance = Math.round(distance * 1000) / 1000;

	return distance;
}

function getPosition(start, end) {
	return {
		x: end.x,
		y: end.y
	}
}

module.exports = Text;
