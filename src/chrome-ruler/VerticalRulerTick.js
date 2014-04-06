/** @jsx React.DOM */

var React = require('react');
var Config = require('./Config');

var VerticalRulerTick = React.createClass({
	render: function() {
		var style = {
			'position': 'absolute',
			'backgroundColor': Config.rulerStrokeColor,
			'height': '1px',
			'width': Config.rulerThickness,
			'left': this.props.left,
			'top': this.props.top
		}

		return (
			<div style={ style } />
		);
	}
});

module.exports = VerticalRulerTick;
