/** @jsx React.DOM */

var React = require('react');
var Config = require('./Config');
var Utils = require('./Utils');
var Data = require('./Data');


var VerticalGrid = React.createClass({
	getInitialState: function() {
		return {
			left: -1
		};
	},

	componentDidMount: function() {
		var key = this.props.key;
		this.data = Data.verticalGrids[key];

		if (this.props.start) {
			this.startDragging();
		}
	},

	startDragging: function(e) {
		Data.dragging.emit('change', true, 'col-resize');

		if (e) e.preventDefault();

		var docElem = document.documentElement;
		docElem.addEventListener('mousemove', this.moveTo);
		docElem.addEventListener('mouseup', this.stopDragging);
	},

	stopDragging: function() {
		var docElem = document.documentElement;
		docElem.removeEventListener('mousemove', this.moveTo);
		docElem.removeEventListener('mouseup', this.stopDragging);

		Data.dragging.emit('change', false, 'col-resize');

		// notify parent
		this.props.onStop(this.props.key);
	},

	moveTo: function(e) {
		this.setState({'left': e.pageX}, function() {
			this.data.data.left = e.pageX;
		});
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
			<div style={ outerDivStyle } onMouseDown={ this.startDragging }>
				<div style={ highlightStyle } />
			</div>
		);
	}
});

module.exports = VerticalGrid;
