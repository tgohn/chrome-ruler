/** @jsx React.DOM */

var React = require('react');
var Path = require('./rulerCanvas/Path');
var Text = require('./rulerCanvas/Text');

var FreeRuler = React.createClass({
	render: function() {
		var canvas_style = {
			'position': 'absolute',
			'min-height' : '100%',
			'min-width'  : '100%',
			'width'   : 1024,
			'height'  : 1024,
			'left'    : 0,
			'top'     : 0,
			'zIndex'  : 10003
		};

		var start = {
			x: 100,
			y: 100
		};

		var end = {
			x: 200,
			y: 200
		};

		return (
			<div>
				<svg style={ canvas_style }>
					<Path start={ start } end={ end } />
				</svg>
				<Text start={ start } end={ end } />
			</div>
		)
	}
});

module.exports = FreeRuler;
