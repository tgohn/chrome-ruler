//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||  This is HR |||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

var mainHR = generateMainHR();
mainHR.appendTo(docBody);

mainHR.on('mousedown', startAddingHR)

function startAddingHR(e) {
	mainHR.on('mouseout', addingHR);
	docBody.addEventListener('mouseup', stopAddingHR);

	function addingHR(e) {
		var target = e.relatedTarget;

		if ( mainHR.hasChildren(target) )
			return;

		stopAddingHR();
		mainCR.disable();
		addHR(e);
	}

	function stopAddingHR(e) {
		mainHR.un('mouseout', addingHR);
		docBody.removeEventListener('mouseup', stopAddingHR);
	}

	stopEvent(e);
}


function addHR(e) {
	if (mainCR.isRuling) {
		stopEvent(e);
		return;
	}

	var svg =  new SVG('svg'),
		shim = generateShim();

	svg.attr({
		viewBox: _(0, 0, 5, grid_padding*2+grid_thickness),
		preserveAspectRatio: 'none',
		style  : {
			'position': 'absolute',
			'min-width' : '100%',
			'height'   : grid_padding*2 + grid_thickness + 'px',
			'left'     : '0',
			'cursor'  : 'row-resize',
			'z-index' : '10001',
			'width'  : pageDimension().width+'px',
			'top'    : e.pageY - grid_padding  + 'px'
		}
	}).append({
		'$rect' : {
			y: grid_padding,
			x: 0,
			width: 5,
			height: 1,
			fill: grid_color
		}
	});

	svg.appendTo(docBody);

	var oy, oTop, oCursor;
		

	svg.on('mousedown', startDragging);

	function startDragging(e) {
		oy = e.pageY;
		oTop = parseInt(svg.style('top'));
		oCursor = docBody.style.cursor;

		shim.appendTo(docBody);

		docBody.style.cursor = 'row-resize';
		docBody.addEventListener('mousemove', moveHR);
		docBody.addEventListener('mouseup', detachHR);

		stopEvent(e);
	}

	function moveHR(e) {
		svg.style('top', oTop + (e.pageY - oy) +'px');
	}

	function detachHR(e) {
		docBody.style.cursor = oCursor;
		docBody.removeEventListener('mousemove', moveHR);
		docBody.removeEventListener('mouseup', detachHR);
		shim.detach();

		var y = getPosY();
		if ( svg.lastY ) 
			HRy.splice(HRy.indexOf(svg.lastY),1,y);
		else
			HRy.push(y)
		svg.lastY = y;
		
		// delete VR
		if ( mainHR.hasChildren(e.target) ) {
			svg.destroy();
			HRy.splice(HRy.indexOf(svg.lastY),1);
			svg = shim = null;
		}

		HRy.doSort();
	}

	function getPosY() {
		return (parseInt(svg.style('top')) + grid_padding);
	}
	
	if (e) startDragging(e); 
}

function generateMainHR() {
	var THICKNESS = 15;

	var svg = new SVG('svg');
		svg.attr({
			style: {
				'position': 'fixed',
				'top' : 0,
				'left': 0,
				'zIndex': 999999,
				'boxShadow': 'rgba(211,211,211,0.5) 0px 0px 5px 2px'},
			'width': '100%',
			'height': THICKNESS,
			'preserveAspectRatio': 'none'
		});

	svg.append({
		'$rect_1' : {
			'width' : 10000,
			'height': THICKNESS,
			'fill'  : 'white',
			'x'     : 0,
			'y'     : 0
		},
		'$rect_2' : {
			'width' : 10000,
			'height': 1,
			'fill'  : 'black',
			'x'     : 0,
			'y'     : THICKNESS - 1
		}
	});

	var tiny_marks = {}
	for (var i=0; i<1000; i++) {
		tiny_marks['$rect_'+i] = {
			'fill': 'black',
			'width' : 1,
			'height': THICKNESS,
			'x' : i*10,
			'y' : THICKNESS - (i%5 ? 5 : i%10 ? 8 : THICKNESS )
		}
	}
	svg.append(tiny_marks);

	return svg;
}
