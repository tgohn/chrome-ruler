/** @jsx React.DOM */

var React = require('react');
var Config = require('./Config');

var HorizontalRulerTick = React.createClass({
	render: function() {
		var style = {
			'position': 'absolute',
			'backgroundColor': Config.rulerStrokeColor,
			'width': '1px',
			'height': Config.rulerThickness,
			'left': this.props.left,
			'top': this.props.top
		};

		return (
			<div style={ style } />
		);
	}
});

module.exports = HorizontalRulerTick;
