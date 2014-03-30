/* globals chrome */
// Called when the user clicks on the browser action.

var script_srcs = ['dist/chrome-ruler.js'];

chrome.browserAction.onClicked.addListener(function(tab) {
	script_srcs.forEach(function executeScript(src) {
		chrome.tabs.executeScript(null, {
			'file': src
		});
	});
});
