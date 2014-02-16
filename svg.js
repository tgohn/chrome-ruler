var SVG_NS = "http://www.w3.org/2000/svg",
	docBody = document.body,
	docElem = document.documentElement;

function SVG(tagName) {
	if (tagName)
		this.dom  = document.createElementNS(SVG_NS, tagName);
}

SVG.prototype.setAttributes = function(attrs) {
	for (var name in attrs) {
		this.setAttribute(name, attrs[name]);
	}

	return this;
}

SVG.prototype.setAttribute = function(name, content) {
	this.dom.setAttribute(name, content);
	return this;
}

SVG.prototype.removeAttribute = function(name) {
	this.dom.removeAttribute(name);
	return this;
}

SVG.prototype.appendChildren = function(children) {
	var self = this;

	children.forEach(function(child) {
		self.append(child);
	});

	return self;
}

SVG.prototype.contains = function(el) {
	var self = this.dom;
	return self !== el && (self.contains ? self.contains(el) : true);
};

SVG.prototype.append = function(elm) {
	if ( !(elm instanceof SVG) && typeof elm == 'object')
		return this.appendTemplate(elm);

	this.dom.appendChild(elm.dom);
	return this;
}

SVG.prototype.appendTemplate = function(template) {
	var elm;
	for (var name in template) {
		// remove '_' and anything after that
		if (! /^\$/.test(name))
			throw ('invalid tagName: ' + name);

		elm = new this.constructor(name.replace(/^\$|_.*$/g,''));
		elm.applyTemplate(template[name]);
		elm.appendTo(this);
	};
	return this;
};

SVG.prototype.appendTo = function(elm) {
	if (elm instanceof SVG)
		elm.dom.appendChild(this.dom);
	else
		elm.appendChild(this.dom);

	return this;
}

SVG.prototype.removeFrom = function(elm) {
	if (elm instanceof SVG)
		elm.dom.removeChild(this.dom);
	else
		elm.removeChild(this.dom);

	return this;
}

SVG.prototype.style = function(name, value) {
	if (typeof name == 'object')
		return this.applyStyleTemplate(name);

	if (typeof value == 'undefined' && /:/.test(name))
		return this.applyStyleString(name);

	if (value === undefined)
		return this.dom.style[name];
	else {
		this.dom.style[name] = value;
		return this;
	}
}

SVG.prototype.applyStyleTemplate = function(template) {
	for (var name in template) {
		this.dom.style[name] = template[name];
	}
	return this;
}

SVG.prototype.applyStyleString = function(str) {
	var styles = str.split(';'), array = [];
	for (var i=0; i< styles.length; i++) {
		array = styles[i].split(':');
		array[0]  = array[0].replace(/\s/g,'');
		this.dom.style[array[0]] = array[1];
	}
	return this;
}

SVG.prototype.setTextContent = function(value) {
	var textNode =  document.createTextNode(value);

	if (this.textNode)
		this.dom.removeChild(this.textNode);

	this.dom.appendChild(textNode);
	this.textNode = textNode;

	return this;
}

SVG.prototype.detach = function() {
	if (this.dom.parentNode)
		this.dom.parentNode.removeChild(this.dom);
	return this;
}

SVG.prototype.destroy = function() {
	if (this.dom.parentNode)
		this.dom.parentNode.removeChild(this.dom);
	this.dom = null;
}

SVG.prototype.on = function(type, callback) {
	this.dom.addEventListener(type, callback, false);
};

SVG.prototype.un = function(type, callback) {
	this.dom.removeEventListener(type, callback);
}

function NATIVE(tagName) {
	this.dom = document.createElement(tagName);
}
NATIVE.prototype = new SVG();
NATIVE.prototype.constructor = NATIVE;
