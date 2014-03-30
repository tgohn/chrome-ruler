var EventEmitter = require('events').EventEmitter;

var Data = {
	horizontalGrids: {},
	verticalGrids: {},
	dragging: new EventEmitter()
};

window.Data = Data;

module.exports = Data;
