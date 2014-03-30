/** @jsx React.DOM */

var React = require('react');
var Path = require('./rulerCanvas/Path');
var Text = require('./rulerCanvas/Text');
var Utils = require('./Utils');
var Config = require('./Config');
var Data = require('./Data');
var lodash = require('lodash');

var FreeRuler = React.createClass({
	getInitialState: function() {
		return {
			mouseDown: false,
		};
	},

	onMouseDown: function(e) {
		this.setState({
			mouseDown: true,
			start: e.ctrlKey ?
				{x: e.pageX, y: e.pageY} : // no snapping
				{x: getSnapX(e.pageX), y: getSnapY(e.pageY)},
			end: undefined
		});
	},

	onMouseMove: function(e) {
		if ( ! this.state.mouseDown || ! this.state.start ) return;

		var x = e.pageX;
		var y = e.pageY;
		var start = this.state.start;

		if (e.shiftKey) {
			// this will be a straight line
			// we need to determine if it is a vertically || horizontally straight
			if (Math.abs(x - start.x) < Math.abs(y - start.y))
				x = start.x;
			else
				y = start.y;
		}

		this.setState({
			end: e.ctrlKey ?
				{x: x , y: y} :
				{x: getSnapX(x), y: getSnapY(y)}
		});
	},

	onMouseUp: function() {
		this.setState({mouseDown: false});
	},

	render: function() {
		var path, text;
		var page_dimension = Utils.getPageDimension();

		var holder_style = {
			'position': 'absolute',
			'zIndex': Config.zIndex - 1 ,
			'top': 0,
			'left': 0,
			'display': this.props.active ? 'block' : 'none'
		};

		var canvas_style = {
			'position': 'absolute',
			'min-height' : '100%',
			'min-width'  : '100%',
			'width'   : page_dimension.width,
			'height'  : page_dimension.height,
			'left'    : 0,
			'top'     : 0
		};

		if (this.state.start && this.state.end) {
			path = (
				<Path start={ this.state.start } end={ this.state.end } />
			);
			text = (
				<Text start={ this.state.start } end={ this.state.end } />
			)
		}

		return (
			<div style={ holder_style }
					onMouseDown = { this.onMouseDown }
					onMouseMove = { this.onMouseMove }
					onMouseUp   = { this.onMouseUp }>
				{ text }
				<svg style={ canvas_style }>
					{ path }
				</svg>
			</div>
		)
	}
});

function getSnapX(check) {
	var vertical_vals = lodash.map(Data.verticalGrids, function(val, key) {
		// get current vertical grids pos
		return val.data.left;
	});
	vertical_vals.sort();

	var snap = lodash.find(vertical_vals, function(left) {
		// check if `check` is in proximity
		if ( Math.abs(check - left) < Config.proximity)
			return true;
	});

	return snap || check;
}

function getSnapY(check) {
	var horizontal_vals = lodash.map(Data.horizontalGrids, function(val, key) {
		// get current horizontal grids pos
		return val.data.top;
	});
	horizontal_vals.sort();

	var snap = lodash.find(horizontal_vals, function(top) {
		// check if `check` is in proximity
		if ( Math.abs(check - top) < Config.proximity)
			return true;
	});

	return snap || check;
}

module.exports = FreeRuler;
