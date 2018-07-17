/** @jsx React.DOM */

(function() {
	var Config = require('./chrome-ruler/Config');
	var React = require('react');

	var MainHR = require('./chrome-ruler/MainHR');
	var MainVR = require('./chrome-ruler/MainVR');
	var MainCR = require('./chrome-ruler/MainCR');
	var Shim = require('./chrome-ruler/Shim');

	var ID = 'grid-ruler-extension';
	var main;

	if (document.getElementById(ID)) {
		// hide/unhide react component
		main = document.getElementById(ID);

		if (main.style.display == 'none')
			main.style.display = '';
		else
			main.style.display = 'none';

		return;
	}
	else {
		main = document.createElement('div');
		main.setAttribute('id', ID);
		document.body.appendChild(main);

		React.renderComponent(
			<div>
				<MainHR />
				<MainVR />
				<MainCR />
				<Shim />
			</div>,
			main
		);
	}
})();
