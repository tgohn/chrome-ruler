//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||  This is VR |||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

var mainVR = generateMainVR();
mainVR.appendTo(docBody);

mainVR.on('mousedown', startAddingVR)

function startAddingVR(e) {
	mainVR.on('mouseout', addingVR);
	docBody.addEventListener('mouseup', stopAddingVR);

	function addingVR(e) {
		var target = e.relatedTarget;

		if ( mainVR.hasChildren(target) ) // not out of mainVR yet
			return;

		stopAddingVR();
		mainCR.disable();

		if (e.ctrlKey)		
			addFVR(e);
		else
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
		viewBox: _(0, 0, grid_padding*2+grid_thickness, 5),
		preserveAspectRatio: 'none',
		style  : {
			'position': 'absolute',
			'min-height' : '100%',
			'width'   : grid_padding*2 + grid_thickness + 'px',
			'top'     : '0',
			'cursor'  : 'col-resize',
			'z-index' : '10001',
			'height'  : pageDimension().height+'px',
			'left'    : e.pageX - grid_padding  + 'px'
		}
	}).append({
		'$rect' : {
			x: grid_padding,
			y: 0,
			width: 1,
			height: 5,
			fill: grid_color
		}
	});


	svg.appendTo(docBody);

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
		if ( svg.lastX ) 
			VRx.splice(VRx.indexOf(svg.lastX),1,x);
		else
			VRx.push(x)
		svg.lastX = x;
		
		// delete VR
		if ( mainVR.hasChildren(e.target) ) {
			svg.destroy();
			VRx.splice(VRx.indexOf(svg.lastX),1);
			svg = shim = null;
		}

		VRx.doSort();
	}

	function getPosX() {
		return parseInt(svg.style('left')) + grid_padding;
	}

	if (e) startDragging(e); // chaining event
}


//|||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||  This is floating VR ||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||

function addFVR(e) {
	var svg =  new SVG('svg'),
		shim = generateShim(),
		org_offset = docBody.scrollWidth - docBody.offsetWidth;

	svg.attr({
		viewBox: _(0, 0, grid_padding*2+grid_thickness, 5),
		preserveAspectRatio: 'none',
		style  : {
			'position': 'absolute',
			'min-height' : '100%',
			'height'  : pageDimension().height+'px',
			'width'   : grid_padding*2 + grid_thickness + 'px',
			'top'     : '0',
			'cursor'  : 'col-resize',
			'z-index' : '10001',
			'left'    : '0px',
//			'right'   : (docElem.scrollWidth%2 ? docElem.scrollWidth+1: docElem.scrollWidth) - e.pageX*2 + 'px',
//			'right'   : (docBody.scrollWidth%2 ? docBody.scrollWidth : docBody.scrollWidth+1) - e.pageX*2 +'px',
			'right'   : (docElem.scrollWidth%2 ? docElem.scrollWidth : docElem.scrollWidth+1) - e.pageX*2 +'px',
			'display' : 'block',
			'margin' : '0 auto',
		}
	}).append({
		'$rect' : {
			x: grid_padding,
			y: 0,
			width: 1,
			height: 5,
			fill: 'red'
		}
	});

	svg.appendTo(docBody);

	var ox, oRight, oCursor, org_right;

	svg.on('mousedown', startDragging);
	window.addEventListener('resize', adjustOnResize);

	function adjustOnResize(e) {
		var scrollWidth = Math.max(docElem.scrollWidth, docBody.scrollWidth),
			offsetWidth = Math.max(docElem.offsetWidth, docBody.offsetWidth);
		console.log (scrollWidth + ' , ' + offsetWidth);

		//var right = mangleRight(parseInt(svg.style('right')) + org_offset - scrollWidth + offsetWidth);
		var right = parseInt(svg.style('right')) + (org_offset - (docBody.scrollWidth - docBody.offsetWidth));
		// udpating dependencies
		//org_offset = Math.max(docElem.scrollWidth, docBody.scrollWidth) - Math.max(docElem.offsetWidth, docBody.offsetWidth);
		org_offset = docBody.scrollWidth - docBody.offsetWidth;

		svg.style('right', right + 'px');

		updateVRx();
		console.log (svg.style('right'));
	}

	function startDragging(e) {
		ox = e.pageX;
		oRight = parseInt(svg.style('right'));
		oCursor = docBody.style.cursor;

		shim.appendTo(docBody);

		docBody.style.cursor = 'col-resize';
		docBody.addEventListener('mousemove', moveVR);
		docBody.addEventListener('mouseup', detachVR);

		stopEvent(e);
	}

	function moveVR(e) {
		//svg.style('right', mangleRight(oRight - 2*(e.pageX - ox)) + 'px');
		var right = oRight - 2*(e.pageX - ox);
		if ((docElem.scrollWidth + right) %2)
			svg.style('right', right + 'px');
		else
			svg.style('right', ++right + 'px')
	}

	function detachVR(e) {
		docBody.style.cursor = oCursor;
		docBody.removeEventListener('mousemove', moveVR);
		docBody.removeEventListener('mouseup', detachVR);
		shim.detach();

		// udpating dependencies
//		org_offset = Math.max(docElem.scrollWidth, docBody.scrollWidth) - Math.max(docElem.offsetWidth, docBody.offsetWidth);
		org_offset = docBody.scrollWidth - docBody.offsetWidth;
		org_right = parseInt(svg.style('right'));
		console.log(org_right);

		updateVRx();	
	
		// delete FVR
		if ( mainVR.hasChildren(e.target) ) {
			svg.destroy();
			VRx.splice(VRx.indexOf(svg.lastX),1);
			svg = shim = null;
		}

		VRx.doSort();
	}

	function updateVRx() {
		var x = getPosX();
		if ( svg.lastX ) 
			VRx.splice(VRx.indexOf(svg.lastX),1,x);
		else
			VRx.push(x)
		svg.lastX = x;
	}

	function getPosX() {
//		return (docElem.scrollWidth %2 ? docElem.scrollWidth-1 : docElem.scrollWidth)/2 - 0.5*parseInt(svg.style('right'));
//		return mangleRight(docElem.scrollWidth - parseInt(svg.style('right')))/2;
		return (docBody.scrollWidth - docBody.offsetWidth)/2 - 0.5*parseInt(svg.style('right'));
	}

/*
	function mangleRight(v) {
		return v;
		if ((docElem.scrollWidth + v) % 2)
			return v-1;
		else
			return v;
	}
*/

	if (e) startDragging(e); // chaining event
}

function generateMainVR() {
	var THICKNESS = 15;

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
			'x' : THICKNESS - (i%5 ? 5 : i%10 ? 8 : THICKNESS )
		}
	}
	svg.append(tiny_marks);

	return svg;
}
