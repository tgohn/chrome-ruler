/** @jsx React.DOM */

var React = require('react');
var Config = require('./Config');
var Utils = require('./Utils');
var Data = require('./Data');


var VerticalGrid = React.createClass({
	getInitialState: function() {
		return {
			left: 100
		};
	},

	componentDidMount: function() {
		var key = this.props.key;
		this.data = Data.verticalGrids[key];

		if (this.data && this.data.data.dragging) {
			startDragging.bind(this, this.data.data.dragging)();
		}
	},

	render: function() {
		var outerDivStyle = {
			'position': 'absolute',
			'min-height': '100%',
			'height': Utils.getPageDimension().height,
			'width': Config.gridPadding*2 + Config.gridThickness,
			'top': '0',
			'left': this.state.left - Config.gridPadding,
			'cursor': 'col-resize',
			'zIndex': Config.zIndex
		};

		var highlightStyle = {
			'position': 'absolute',
			'left': Config.gridPadding,
			'top': 0,
			'height': '100%',
			'width': Config.gridThickness,
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

	Data.dragging.emit('change', true, 'col-resize');

	// attach event to global
	docBody.addEventListener('mousemove', move);
	docBody.addEventListener('mouseup', stop);

	function move(e) {
		self.setState({
			'left': e.pageX
		}, function() {
			data.data.left = e.pageX;
		});
	}

	function stop(e) {
		// remove events from global
		docBody.removeEventListener('mousemove', move);
		docBody.removeEventListener('mouseup', stop);

		Data.dragging.emit('change', false, 'col-resize');
		data.data.dragging = null;
	}
}

module.exports = VerticalGrid;
