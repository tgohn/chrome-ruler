/** @jsx React.DOM */

var Config = require('./chrome-ruler/Config');
var React = require('react');

window.React = React;

var MainHR = require('./chrome-ruler/MainHR');
var MainVR = require('./chrome-ruler/MainVR');
var Shim = require('./chrome-ruler/Shim');

var main = document.createElement('div');
document.body.appendChild(main);

window.main = React.renderComponent(
	<div>
		<MainHR />
		<MainVR />
		<Shim />
	</div>,
	main
);
