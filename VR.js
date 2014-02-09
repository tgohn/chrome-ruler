//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||  This is VR |||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
var mainVR = generateMainVR();
mainVR.appendTo(docBody);

mainVR.on('mousedown', startAddingVR)

function startAddingVR(e) {
	mainVR.on('mouseout', addingVR);
	docBody.addEventListener('mouseup', stopAddingVR);

	function addingVR(e) {  // on mouse leave
		var target = e.relatedTarget;
		if (mainVR.contains(target)) // not out of mainVR yet
			return;

		stopAddingVR();
		mainCR.disable();
		addVR(e);
	}

	function stopAddingVR(e) {
		mainVR.un('mouseout', addingVR);
		docBody.removeEventListener('mouseup', stopAddingVR);
	}

	stopEvent(e);
}

function addVR(e) {
	var svg =  new SVG('svg'),
		shim = generateShim();

	svg.attr({
		viewBox: _(0, 0, Config.grid_padding*2 + Config.grid_thickness, 5),
		preserveAspectRatio: 'none',
		style  : {
			'position': 'absolute',
			'min-height' : '100%',
			'width'   : Config.grid_padding*2 + Config.grid_thickness + 'px',
			'top'     : '0',
			'cursor'  : 'col-resize',
			'z-index' : '10001',
			'height'  : pageDimension().height + 'px',
			'left'    : e.pageX - Config.grid_padding + 'px'
		}
	}).append({
		'$rect' : {
			x: Config.grid_padding,
			y: 0,
			width: 1,
			height: 5,
			fill: Config.grid_color
		}
	}).appendTo(docBody);


	var ox, oLeft, oCursor;

	svg.on('mousedown', startDragging);

	function startDragging(e) {
		ox = e.pageX;
		oLeft = parseInt(svg.style('left'));
		oCursor = docBody.style.cursor;

		shim.appendTo(docBody);

		docBody.style.cursor = 'col-resize';
		docBody.addEventListener('mousemove', moveVR);
		docBody.addEventListener('mouseup', detachVR);

		stopEvent(e);
	}

	function moveVR(e) {
		svg.style('left', oLeft + (e.pageX - ox) + 'px');
	}

	function detachVR(e) {
		docBody.style.cursor = oCursor;
		docBody.removeEventListener('mousemove', moveVR);
		docBody.removeEventListener('mouseup', detachVR);
		shim.detach();

		var x = getPosX();
		if (svg.lastX)
			VRx.splice(VRx.indexOf(svg.lastX),1,x);
		else
			VRx.push(x)
		svg.lastX = x;

		// delete VR
		if ( mainVR.contains(e.target) ) {
			svg.destroy();
			VRx.splice(VRx.indexOf(svg.lastX), 1);
			svg = shim = null;
		}

		VRx.doSort();
	}

	function getPosX() {
		return parseInt(svg.style('left')) + Config.grid_padding;
	}

	if (e) startDragging(e); // chaining event
}


function generateMainVR() {
	var THICKNESS = Config.rulerThickness;

	var svg = new SVG('svg');
		svg.attr({
			'style' : {
				'position': 'fixed',
				'top' : 0,
				'left': 0,
				'zIndex': 999999,
				'boxShadow': 'rgba(211,211,211,0.5) 0px 0px 5px 2px'},
			'height': '100%',
			'width': THICKNESS,
			'preserveAspectRatio': 'none'
		});

	svg.append({
		'$rect_1' : {
			'height': 10000,
			'width' : THICKNESS,
			'fill'  : 'white',
			'x'     : 0,
			'y'     : 0
		},
		'$rect_2' : {
			'height': 10000,
			'width' : 1,
			'fill'  : 'black',
			'y'     : 0,
			'x'     : THICKNESS - 1
		}
	});

	var tiny_marks = {}
	for (var i=0; i<1000; i++) {
		tiny_marks['$rect_'+i] = {
			'fill': 'black',
			'height' : 1,
			'width': THICKNESS,
			'y' : i*10,
			'x' : THICKNESS - (i%5 ? 5 : i%10 ? 8 : THICKNESS)
		}
	}
	svg.append(tiny_marks);

	return svg;
}
