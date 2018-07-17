var EventEmitter = require('events').EventEmitter;

var Data = {
	horizontalGrids: {},
	verticalGrids: {},
	dragging: new EventEmitter()
};

module.exports = Data;
