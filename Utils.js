//|||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||| Util functions |||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||
function pageDimension() {
	return { height: Math.max(docBody.scrollHeight, docElem.scrollHeight),
			 width: Math.max(docBody.scrollWidth, docElem.scrollWidth) }
}

function stopEvent(e) {
	e.preventDefault();
	e.stopPropagation();
}

function generateShim(z) {
	var shim = new NATIVE('div');
		shim.attr( {
			style: {
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				zIndex: z ? z : '999'
			}
		});
	return shim;
}

function _(command) {
	var str = '';
	if (typeof command == 'string') {
		str += command;
		Array.prototype.shift.call(arguments)
	}
	str += Array.prototype.join.call(arguments, ', ');
	return ' '+str+' ';
}

var Config = {
    ruler_thickess:  15,
	grid_padding:    8,
	grid_thickness:  1,
	grid_color:      '#22F5F5',
	CR_fill:         '#07336E',
	ruler_color:     '#07336E',
	ruler_stroke:    'black'
}

//guestColor();
function guestColor() {
	var span = document.getElementsByTagName('span')[0] || document.getElementsByTagName('p')[0] || document.getElementsByTagName('div')[0],
		style = window.getComputedStyle(span, null);

	if (!style) {
		// FAIL !!!!!!
	}
	else {
		ruler_color = style.color;
		ruler_stroke = style.backgroundColor;
	}	
}

var VRx = []; HRy = [];

HRy.doSort = function() {
	HRy.sort(function(a,b) {
		return a-b;
	})
}

VRx.doSort = function() {
	VRx.sort(function(a,b) {
		return a-b
	})
}