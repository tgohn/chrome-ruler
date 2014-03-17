/** @jsx React.DOM */

var React = require('react');
var HorizontalGrid = require('./HorizontalGrid');
var HorizontalRuler = require('./HorizontalRuler');
var Shim = require('./Shim');
var GridsData = require('./GridsData');
var lodash = require('lodash');
var EventEmitter = require('events').EventEmitter;

var MainHR = React.createClass({
	getInitialState: function() {
		return {
			rulerMouseDown: false,
			creatungGrid: false
		};
	},

	onRulerMouseDown: function(e) {
		e.preventDefault();
		this.setState({rulerMouseDown: true});
	},

	onRulerMouseUp: function() {
		this.setState({rulerMouseDown: false});
	},

	onRulerMouseLeave: function(e) {
		this.setState({
			rulerMouseDown: false,
			creatingGrid: this.state.rulerMouseDown ? lodash.clone(e) : false
		});
	},

	componentDidUpdate: function() {
		this.state.creatingGrid && this.setState({creatingGrid: false});
	},

	render: function() {
		if (this.state.creatingGrid) {
			var grid = addGrid(this.state.creatingGrid);
			var newGridId = grid.data.id;
		}

		var grids = lodash.map(GridsData.horizontalGrids, function(grid) {
			return <HorizontalGrid key={ grid.data.id } />
		});

		return (
			<div>
				<HorizontalRuler onMouseDown={ this.onRulerMouseDown }
					onMouseUp={ this.onRulerMouseUp }
					onMouseLeave={ this.onRulerMouseLeave }/>
					{
						grids
					}
			</div>
		)
	}
});


function addGrid(e) {
	var id = 'horizontal-grid-' + Date.now();
	var grid =  new EventEmitter();
	grid.data = {
		id: id,
		top: e.pageY,
		dragging: e
	};

	GridsData.horizontalGrids[id] = grid;

	return grid;
}

module.exports = MainHR;
