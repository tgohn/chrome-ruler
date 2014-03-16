/** @jsx React.DOM */

var React = require('react');
var Config = require('./Config');
var Utils = require('./Utils');
var Shim = require('./Shim');


var HorizontalGrid = React.createClass({
	getInitialState: function() {
		return {
			top: 100
		};
	},

	render: function() {
		var outerDivStyle = {
			'position': 'absolute',
			'min-width': '100%',
			'width': Utils.getPageDimension().width,
			'height': Config.gridPadding*2 + Config.gridThickness,
			'left': '0',
			'top': this.props.top - Config.gridPadding,
			'cursor': 'row-resize',
			'z-index': Config.zIndex + 10
		};

		var highlightStyle = {
			'position': 'absolute',
			'top': Config.gridPadding,
			'left': 0,
			'width': '100%',
			'height': Config.gridThickness,
			'backgroundColor': Config.gridBackgroundColor
		};

		return (
			<div style={ outerDivStyle } onMouseDown={ this.props.dragGrid }>
				<div style={ highlightStyle } />
			</div>
		);
	}
});


function startDragging(e) {
	var self = this;
	var docBody = document.body;

	self.dragging = self.dragging || {};

	// trigger shim;
	var shimContainer = document.createElement('div');
	var shim = React.renderComponent(Shim(), shimContainer);
	docBody.appendChild(shimContainer);
	shimContainer.style.cursor = 'row-resize';

	docBody.addEventListener('mousemove', move);
	docBody.addEventListener('mouseup', stop);

	function move(e) {
		self.setState({
			'top': e.pageY
		});
	}

	function stop(e) {
		docBody.removeEventListener('mousemove', move);
		docBody.removeEventListener('mouseup', stop);

		React.unmountComponentAtNode(shimContainer);
		docBody.removeChild(shimContainer);
	}
}

module.exports = HorizontalGrid;
