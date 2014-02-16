// Called when the user clicks on the browser action.

script_srcs = ['Utils.js', 'svg.js', 'HR.js', 'VR.js', 'ruler.js']

chrome.browserAction.onClicked.addListener(function(tab) {
	script_srcs.forEach(function executeScript(src) {
		chrome.tabs.executeScript(null, {
			'file': src
		});
	});
});
