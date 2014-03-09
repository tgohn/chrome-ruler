/** @jsx React.DOM */

var React = require('react');
var Config = require('./Config');
var Utils = require('./Utils');


var HorizontalGrid = React.createClass({
	getInitialState: function() {
		return {
			top: 100
		}
	},

	render: function() {
		var outerDivStyle = {
			'position': 'absolute',
			'min-width': '100%',
			'width': Utils.getPageDimension().width,
			'height': Config.gridPadding*2 + Config.gridThickness,
			'left': '0',
			'top': this.state.top - Config.gridPadding,
			'cursor': 'row-resize',
			'z-index': Config.zIndex + 1
		};

		var highlightStyle = {
			'position': 'absolute',
			'top': Config.gridPadding,
			'left': 0,
			'width': '100%',
			'height': Config.gridThickness,
			'backgroundColor': Config.gridBackgroundColor
		}

		return (
			<div style={ outerDivStyle } onMouseDown={ startDragging.bind(this) }>
				<div style={ highlightStyle } />
			</div>
		);
	}
});


function startDragging(e) {
	var self = this;
	self.dragging = self.dragging || {};
	self.dragging.oY = e.pageY;
	self.dragging.oTop = self.state.top;
	self.dragging.oCursor = document.body.style.cursor;

	// trigger shim;

	document.body.style.cursor = 'row-resize';
	document.body.addEventListener('mousemove', move);
	document.body.addEventListener('mouseup', stop);

	function move(e) {
		self.setState({
			'top': self.dragging.oTop + (e.pageY - self.dragging.oY)
		});
	}

	function stop(e) {
		document.body.style.cursor = self.dragging.oCursor;
		document.body.removeEventListener('mousemove', move);
		document.body.removeEventListener('mouseup', stop);
	}
}

module.exports = HorizontalGrid;
