/** @jsx React.DOM */

var React = require('react');
var HorizontalGrid = require('./HorizontalGrid');
var HorizontalRuler = require('./HorizontalRuler');
var Data = require('./Data');
var lodash = require('lodash');
var EventEmitter = require('events').EventEmitter;

var MainHR = React.createClass({
	getInitialState: function() {
		return {
			rulerMouseDown: false,
			creatingGrid: false
		};
	},

	onRulerMouseDown: function(e) {
		e.preventDefault();
		this.setState({rulerMouseDown: true});
	},

	onRulerMouseUp: function() {
		this.setState({rulerMouseDown: false});
	},

	onRulerMouseEnter: function() {
		this.setState({rulerMouseEntered: true});
	},

	onRulerMouseLeave: function(e) {
		this.setState({
			rulerMouseEntered: false,
			rulerMouseDown: false,
			creatingGrid: this.state.rulerMouseDown ? lodash.clone(e) : false
		});
	},

	onGridStop: function(gridId) {
		if (!this.state.rulerMouseEntered) return;
		delete Data.horizontalGrids[gridId];
		this.render();
	},

	componentDidUpdate: function() {
		this.state.creatingGrid && this.setState({creatingGrid: false});
	},

	render: function() {
		if (this.state.creatingGrid) {
			var grid = addGrid(this.state.creatingGrid);
			var newGridId = grid.data.id;
		}

		var grids = lodash.map(Data.horizontalGrids, (function(grid) {
			return (
				<HorizontalGrid key={ grid.data.id } onStop={ this.onGridStop }
						start={ grid.data.id == newGridId ? true : false } />
			)
		}).bind(this));

		return (
			<div>
				<HorizontalRuler
						onMouseDown={ this.onRulerMouseDown }
						onMouseUp={ this.onRulerMouseUp }
						onMouseEnter={ this.onRulerMouseEnter }
						onMouseLeave={ this.onRulerMouseLeave } />
				{ grids }
			</div>
		)
	}
});


function addGrid(e) {
	var id = 'horizontal-grid-' + Date.now();
	var grid =  new EventEmitter();
	grid.data = {
		id: id,
		top: e.pageY
	};

	Data.horizontalGrids[id] = grid;

	return grid;
}

module.exports = MainHR;
