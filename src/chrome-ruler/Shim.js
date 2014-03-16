/** @jsx React.DOM */

var Config = require('./Config');
var React = require('react');

var Shim = React.createClass({
	render: function() {
		var style = {
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			display: this.props.display || '',
			zIndex: Config.zIndex - 1
		};

		return (
			<div style={ style } />
		);
	}
});

module.exports = Shim;
