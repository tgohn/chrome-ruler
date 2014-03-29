/** @jsx React.DOM */

var React = require('react');
var CentralRuler = require('./CentralRuler');
var RulerCanvas = require('./RulerCanvas');

var MainCR = React.createClass({
	getInitialState: function() {
		return {
			isActive: false
		};
	},

	onCRClick: function() {
		this.setState({ isActive: !this.state.isActive });
	},

	render: function() {
		return (
			<div>
				<CentralRuler onClick={ this.onCRClick } active={ this.state.isActive } />
				<RulerCanvas />
			</div>
		)
	}
});

module.exports = MainCR;
