/** @jsx React.DOM */

var React = require('react');
var Config = require('../Config.js');

var Path = React.createClass({
	render: function() {
		var direction = calculateDir(this.props.start, this.props.end);

		return (
			<path d={ direction }
				shape-rendering='geometricPrecision'
				fill={ Config.tapeBackgroundColor } />
		)
	}
});

function calculateDir(start, end) {
	var ox = start.x;
	var oy = start.y;
	var x = end.x;
	var y = end.y;

	var dx = (x - ox) < 0 ? -1 : 1;
	var dy = (y - oy) < 0 ? -1 : 1;

	return (
		marker(ox, oy, dx, dy) +
		marker(x, y, (x == ox ? dx : -dx), (y == oy ? dy : -dy)) +
		conn(ox, oy, x, y)
	);
}

function marker(x, y, dx, dy) {
	// WTF: what's this?
	var t = 25;
	var str = '';

	dx > 0 && x++;
	dy > 0 && y++;

	// have to keep everything counter cw --- fill mode is lame
	if (dx*dy > 0)
		str += _('M',x,y) + _('h',dx*(t-1)) + _('v',-dy) +
				 _('h',-dx*t) + _('v',dy*t) + _('h',dx) + 'z';
	else
		str += _('M',x,y) + _('v',dy*(t-1)) + _('h', -dx) +
				 _('v',-dy*t) + _('h',dx*t) + _('v',dy) + 'z';

	return str;
}

function conn(ox, oy, x, y) {
	// WTF: what's this?
	var str = '',
		dx = (x-ox) < 0 ? -1 : 1,
		dy = (y-oy) < 0 ? -1 : 1;

	if (dx > 0) {
		x++; ox++;
	}
	if (dy < 0) {
		y++; oy++;
	}

	// have to keep everything counter cw --- fill mode is lame
	if (dx*dy > 0)
		str += _('M',ox,oy) + _('l',-dx,dy) + _('l',x-ox,y-oy) + _('l',dx,-dy) + 'z';
	else
		str += _('M',ox,oy) + _('l',x-ox,y-oy) + _('l',-dx,dy) + _('l',ox-x,oy-y) + 'z';

	return str;
}

function _(command) {
	// utility to output svg path string
	var str = '';
	var args = [].slice.call(arguments);

	if (typeof command == 'string') {
		str += command;
		args.shift();
	}

	str += args.join(', ');
	return ' ' + str + ' ';
}

module.exports = Path;
