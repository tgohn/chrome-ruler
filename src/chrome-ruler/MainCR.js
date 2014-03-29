/** @jsx React.DOM */

var React = require('react');
var CentralRuler = require('./CentralRuler');

var MainCR = React.createClass({
	render: function() {
		return (
			<CentralRuler />
		)
	}
});

module.exports = MainCR;
