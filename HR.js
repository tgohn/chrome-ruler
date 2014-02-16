//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||  This is HR |||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
var THICKNESS = Config.rulerThickness;

var mainHR = generateMainHR();
mainHR.appendTo(docBody);

mainHR.on('mousedown', startAddingHR)

function startAddingHR(e) {
	mainHR.on('mouseout', addingHR);
	docBody.addEventListener('mouseup', stopAddingHR);

	function addingHR(e) {
		// mouse leave
		var target = e.relatedTarget;

		if (mainHR.contains(target)) return;

		stopAddingHR();
		mainCR.disable();
		addHR(e);
	}

	function stopAddingHR(e) {
		mainHR.un('mouseout', addingHR);
		docElem.removeEventListener('mouseup', stopAddingHR);
	}

	stopEvent(e);
}


function addHR(e) {
	if (mainCR.isRuling) {
		stopEvent(e);
		return;
	}

	var hr =  new NATIVE('div'),
		shim = generateShim();

	hr.style({
			'position': 'absolute',
			'min-width' : '100%',
			'height'   : Config.grid_padding*2 + Config.grid_thickness + 'px',
			'left'     : '0',
			'cursor'  : 'row-resize',
			'z-index' : '10001',
			'width'  : pageDimension().width+'px',
			'top'    : e.pageY - Config.grid_padding  + 'px'
	});
	hr.append(
		new NATIVE('div').style({
			'position': 'absolute',
			'top': Config.grid_padding + 'px',
			'left': 0,
			'width': '100%',
			'height': '1px',
			'backgroundColor': Config.grid_color
		})
	);
	hr.appendTo(docBody);

	// Start listening to Events
	var oy, oTop, oCursor;  // o = original

	hr.on('mousedown', startDragging);
	if (e) startDragging(e);

	function startDragging(e) {
		oy = e.pageY;
		oTop = parseInt(hr.style('top'));
		oCursor = docBody.style.cursor;

		shim.appendTo(docBody);

		docBody.style.cursor = 'row-resize';
		docBody.addEventListener('mousemove', moveHR);
		docBody.addEventListener('mouseup', detachHR);

		stopEvent(e);
	}

	function moveHR(e) {
		hr.style('top', oTop + (e.pageY - oy) +'px');
	}

	function detachHR(e) {
		docBody.style.cursor = oCursor;
		docBody.removeEventListener('mousemove', moveHR);
		docBody.removeEventListener('mouseup', detachHR);
		shim.detach();

		// HRy keeps track of available HRs
		var y = getPosY();
		if (hr.lastY)
			HRy.splice(HRy.indexOf(hr.lastY), 1, y); // replace last known y coord with new one
		else
			HRy.push(y)
		hr.lastY = y;

		// check if deleting HR is in order
		if ( mainHR.contains(e.target) || mainHR.dom === e.target ) {
			hr.destroy();
			HRy.splice(HRy.indexOf(hr.lastY), 1);
			hr = shim = null;
		}

		HRy.doSort();
	}

	function getPosY() {
		return (parseInt(hr.style('top')) + Config.grid_padding);
	}
}

function generateMainHR() {
	var mainHR = new NATIVE('div');

	mainHR.style({
		'boxSizing': 'border-box',
		'position': 'fixed',
		'top' : 0,
		'left': 0,
		'zIndex': 999999,
		'width': '100%',
		'height': THICKNESS + 'px',
		'boxShadow': 'rgba(211,211,211,0.5) 0px 0px 5px 2px',
		'overflow': 'hidden',
		'backgroundColor': 'white',
		'borderBottom': '1px solid black'
	});

	var tiny_marks = [];
	for (var i = 0; i < 1000; i ++) {
		var mark = new NATIVE('div');
		mark.style({
			'position': 'absolute',
			'backgroundColor': 'black',
			'width': '1px',
			'height': Config.rulerThickness + 'px',
			'left': i*10 + 'px',
			'top': Config.rulerThickness - (i%5 ? 5 : i%10 ? 8 : THICKNESS) + 'px'
		});

		tiny_marks.push(mark);
	}
	mainHR.appendChildren(tiny_marks);

	return mainHR;
}
