/** @jsx React.DOM */

var Config = require('./chrome-ruler/Config');
var React = require('react');

var HorizontalRuler = require('./chrome-ruler/HorizontalRuler');

var main = document.createElement('div');
document.body.appendChild(main);

React.renderComponent(
	<div>
		<HorizontalRuler />
	</div>,
	main
);
