/** @jsx React.DOM */

var React = require('react');
var CentralRuler = require('./CentralRuler');

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
			<CentralRuler onClick={ this.onCRClick } active={ this.state.isActive } />
		)
	}
});

module.exports = MainCR;
