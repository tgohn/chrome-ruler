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
	var vr =  new NATIVE('div'),
		shim = generateShim();

	vr.style({
		'position': 'absolute',
		'minHeight' : '100%',
		'width'   : Config.grid_padding*2 + Config.grid_thickness + 'px',
		'top'     : '0',
		'cursor'  : 'col-resize',
		'z-index' : '10001',
		'height'  : pageDimension().height + 'px',
		'left'    : e.pageX - Config.grid_padding + 'px'
	});
	vr.append(
		new NATIVE('div').style({
			'position': 'absolute',
			'left': Config.grid_padding + 'px',
			'top': 0,
			'width': '1px',
			'height': '100%',
			'backgroundColor': Config.grid_color
		})
	);
	vr.appendTo(docBody);


	var ox, oLeft, oCursor;

	vr.on('mousedown', startDragging);

	function startDragging(e) {
		ox = e.pageX;
		oLeft = parseInt(vr.style('left'));
		oCursor = docBody.style.cursor;

		shim.appendTo(docBody);

		docBody.style.cursor = 'col-resize';
		docBody.addEventListener('mousemove', moveVR);
		docBody.addEventListener('mouseup', detachVR);

		stopEvent(e);
	}

	function moveVR(e) {
		vr.style('left', oLeft + (e.pageX - ox) + 'px');
	}

	function detachVR(e) {
		docBody.style.cursor = oCursor;
		docBody.removeEventListener('mousemove', moveVR);
		docBody.removeEventListener('mouseup', detachVR);
		shim.detach();

		var x = getPosX();
		if (vr.lastX)
			VRx.splice(VRx.indexOf(vr.lastX),1,x);
		else
			VRx.push(x)
		vr.lastX = x;

		// delete VR
		if ( mainVR.contains(e.target) ) {
			vr.destroy();
			VRx.splice(VRx.indexOf(vr.lastX), 1);
			vr = shim = null;
		}

		VRx.doSort();
	}

	function getPosX() {
		return parseInt(vr.style('left')) + Config.grid_padding;
	}

	if (e) startDragging(e); // chaining event
}


function generateMainVR() {
	var mainVR = new NATIVE('div');
	mainVR.style({
		'boxSizing': 'border-box',
		'position': 'fixed',
		'height': '100%',
		'width': Config.rulerThickness + 'px',
		'top' : 0,
		'left': 0,
		'zIndex': 999999,
		'background': 'white',
		'borderRight': '1px solid black',
		'boxShadow': 'rgba(211,211,211,0.5) 0px 0px 5px 2px',
		'overflow': 'hidden'
	});

	var tiny_marks = [];
	for (var i = 0; i < 1000; i ++) {
		var mark = new NATIVE('div');
		mark.style({
			'position': 'absolute',
			'backgroundColor': 'black',
			'height': '1px',
			'width': Config.rulerThickness + 'px',
			'top': i*10 + 'px',
			'left': Config.rulerThickness - (i%5 ? 5 : i%10 ? 8 : THICKNESS) + 'px'
		});

		tiny_marks.push(mark);
	}
	mainVR.appendChildren(tiny_marks);

	return mainVR;
}
