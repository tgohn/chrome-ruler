/** @jsx React.DOM */

var React = require('react');
var Config = require('./Config');
var Utils = require('./Utils');
var Data = require('./Data');


var HorizontalGrid = React.createClass({
	getInitialState: function() {
		return {
			top: -1
		};
	},

	componentDidMount: function() {
		var key = this.props.key;
		this.data = Data.horizontalGrids[key];

		if (this.props.start) {
			this.startDragging();
		}
	},

	startDragging: function(e) {
		Data.dragging.emit('change', true, 'row-resize');

		if (e) e.preventDefault();

		var docElem = document.documentElement;
		docElem.addEventListener('mousemove', this.moveTo);
		docElem.addEventListener('mouseup', this.stopDragging);
	},

	stopDragging: function() {
		var docElem = document.documentElement;
		docElem.removeEventListener('mousemove', this.moveTo);
		docElem.removeEventListener('mouseup', this.stopDragging);

		Data.dragging.emit('change', false, 'row-resize');
		this.data.data.dragging = null;

		// notify parent
		this.props.onStop(this.props.key);
	},

	moveTo: function(e) {
		this.setState({'top': e.pageY}, function() {
			this.data.data.top = e.pageY;
		});
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
			'zIndex': Config.zIndex
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
			<div style={ outerDivStyle } onMouseDown={ this.startDragging }>
				<div style={ highlightStyle } />
			</div>
		);
	}
});

module.exports = HorizontalGrid;
