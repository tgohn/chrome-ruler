/** @jsx React.DOM */

var React = require('react');
var CentralRuler = require('./CentralRuler');
var RulerCanvas = require('./RulerCanvas');

var MainCR = React.createClass({
	getInitialState: function() {
		return {
			isActive: false
		};
	},

	componentDidMount: function() {
		// add ESC key listener to disable isActive
		var self = this;

		document.addEventListener('keyup', function(e) {
			if (e.keyCode !== 27) return;

			self.setState({ isActive: false });
		});
	},

	onCRClick: function() {
		this.setState({ isActive: !this.state.isActive });
	},

	render: function() {
		return (
			<div>
				<CentralRuler onClick={ this.onCRClick } active={ this.state.isActive } />
				<RulerCanvas active={ this.state.isActive } />
			</div>
		)
	}
});

module.exports = MainCR;
