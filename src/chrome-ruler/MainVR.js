/** @jsx React.DOM */

var React = require('react');
var VerticalRuler = require('./VerticalRuler');
var VerticalGrid = require('./VerticalGrid');
var Data = require('./Data');
var lodash = require('lodash');
var EventEmitter = require('events').EventEmitter;

var MainVR = React.createClass({
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
		delete Data.verticalGrids[gridId];
		this.render();
	},

	componentDidUpdate: function() {
		// only create one grid at a go
		this.state.creatingGrid && this.setState({creatingGrid: false});
	},

	render: function() {
		if (this.state.creatingGrid) {
			var grid = addGrid(this.state.creatingGrid);
			var newGridId = grid.data.id;
		}

		var grids = lodash.map(Data.verticalGrids, (function(grid) {
			return (
				<VerticalGrid key={ grid.data.id } onStop={ this.onGridStop }
						start={ grid.data.id == newGridId }/>
			)
		}).bind(this));

		return (
			<div>
				<VerticalRuler
						onMouseDown  = { this.onRulerMouseDown }
						onMouseUp    = { this.onRulerMouseUp }
						onMouseEnter = { this.onRulerMouseEnter }
						onMouseLeave = { this.onRulerMouseLeave } />
				{ grids }
			</div>
		)
	}
});


function addGrid(e) {
	var id = 'vertical-grid-' + Date.now();
	var grid =  new EventEmitter();
	grid.data = {
		id: id,
		left: e.pageX
	};

	Data.verticalGrids[id] = grid;

	return grid;
}

module.exports = MainVR;
