/** @jsx React.DOM */

var React = require('react');
var HorizontalGrid = require('./HorizontalGrid');
var HorizontalRuler = require('./HorizontalRuler');
var Shim = require('./Shim');
var GridsData = require('./GridsData');
var lodash = require('lodash');

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
			dragginGrid: true,
			creatingGrid: lodash.clone(e)
		});
	},

	componentDidUpdate: function() {
		this.state.creatingGrid && this.setState({creatingGrid: false});
	},

	render: function() {
		if (this.state.creatingGrid) {
			var grid = addGrid(this.state.creatingGrid);
		}

		return (
			<div>
				<HorizontalRuler onMouseDown={ this.onRulerMouseDown }
					onMouseUp={ this.onRulerMouseUp }
					onMouseLeave={ this.onRulerMouseLeave }/>
					{
						GridsData.horizontalGrids.map(function(data) {
							return <HorizontalGrid key={ data.id } top={ data.top } />
						})
					}
				<Shim display={ this.state.draggingGrid ? '' : 'none' } />
			</div>
		)
	}
});


function addGrid(e) {
	var grid = {
		id: 'horizontal-grid-' + Date.now(),
		top: e.pageY
	};
	GridsData.horizontalGrids.push(grid);

	return grid;
}

module.exports = MainHR;
