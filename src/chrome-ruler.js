/** @jsx React.DOM */

(function() {
	var Config = require('./chrome-ruler/Config');
	var React = require('react');

	var MainHR = require('./chrome-ruler/MainHR');
	var MainVR = require('./chrome-ruler/MainVR');
	var MainCR = require('./chrome-ruler/MainCR');
	var Shim = require('./chrome-ruler/Shim');

	var ID = 'chrome-ruler';

	if (document.getElementById(ID)) return;

	var main = document.createElement('div');
	document.body.appendChild(main);

	React.renderComponent(
		<div id={ ID }>
			<MainHR />
			<MainVR />
			<MainCR />
			<Shim />
		</div>,
		main
	);
})();
