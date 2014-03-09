module.exports.getPageDimension = function() {
	var docBody = document.body;
	var docElem = document.documentElement;

	return {
		height: Math.max(docBody.scrollHeight, docElem.scrollHeight),
		width: Math.max(docBody.scrollWidth, docElem.scrollWidth)
	}
}
