/** @jsx React.DOM */

var React = require('react');
var Config = require('./Config');

var CentralRuler = React.createClass({
	render: function() {
		var style = {
			'boxSizing': 'border-box',
			'position': 'fixed',
			'top': 0,
			'left': 0,
			'width': Config.rulerThickness,
			'height': Config.rulerThickness,
			'borderRight': '1px solid ' + Config.rulerStrokeColor,
			'borderBottom': '1px solid ' + Config.rulerStrokeColor,
			'backgroundColor': Config.rulerBackgroundColor,
			'zIndex' : Config.zIndex,
			'cursor': 'pointer'
		};


		return (
			<div style={ style }>
			</div>
		);
	}
});

module.exports = CentralRuler;
