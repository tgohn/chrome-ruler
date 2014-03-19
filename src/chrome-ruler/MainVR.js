/** @jsx React.DOM */

var React = require('react');
var VerticalRuler = require('./VerticalRuler');

var MainVR = React.createClass({
	render: function() {
		return (
			<VerticalRuler />
		)
	}
});

module.exports = VerticalRuler;
