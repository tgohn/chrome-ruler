/** @jsx React.DOM */

var React = require('react');
var Config = require('./Config');
var Utils = require('./Utils');
var Shim = require('./Shim');
var Data = require('./Data');


var HorizontalGrid = React.createClass({
	getInitialState: function() {
		return {
			top: 100
		};
	},

	componentDidMount: function() {
		var key = this.props.key;
		this.data = Data.horizontalGrids[key];

		if (this.data.data.dragging) {
			startDragging.bind(this, this.data.data.dragging)();
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
			<div style={ outerDivStyle } onMouseDown={ startDragging.bind(this) }>
				<div style={ highlightStyle } />
			</div>
		);
	}
});

function startDragging(e) {
	var self = this;
	var docBody = document.body;
	var data = this.data;

	Data.dragging.emit('change', true, 'row-resize');

	// attach event to global
	docBody.addEventListener('mousemove', move);
	docBody.addEventListener('mouseup', stop);

	function move(e) {
		self.setState({
			'top': e.pageY
		});
	}

	function stop(e) {
		// remove events from global
		docBody.removeEventListener('mousemove', move);
		docBody.removeEventListener('mouseup', stop);

		Data.dragging.emit('change', false, 'row-resize');
		data.data.dragging = null;
	}
}

module.exports = HorizontalGrid;
