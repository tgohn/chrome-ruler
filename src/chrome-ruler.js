/** @jsx React.DOM */

var Config = require('./chrome-ruler/Config');
var React = require('react');

window.React = React;

var HorizontalRuler = require('./chrome-ruler/HorizontalRuler');
var HorizontalGrid = require('./chrome-ruler/HorizontalGrid');
var MainHR = require('./chrome-ruler/MainHR');

var main = document.createElement('div');
document.body.appendChild(main);

window.main = React.renderComponent(
	<div>
		<MainHR />
	</div>,
	main
);
